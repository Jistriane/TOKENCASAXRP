/**
 * Escrow Contract - Distribuição Automática de Aluguel
 * Gerencia Escrows time-locked para distribuição proporcional de aluguéis
 */

import { Client, Wallet, Transaction, convertStringToHex } from 'xrpl';

export interface EscrowConfig {
  propertyId: string;
  propertyName: string;
  totalRent: number;
  totalTokens: number;
  releaseDate: Date; // Dia do mês para distribuição
}

export interface EscrowInfo {
  id: string;
  propertyId: string;
  totalRent: number;
  rentPerToken: number;
  releaseDate: Date;
  distributed: boolean;
  transactionHash: string;
}

export interface HolderDistribution {
  address: string;
  tokens: number;
  payment: number;
  distributed: boolean;
}

export class EscrowContract {
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(network: 'mainnet' | 'testnet' | 'devnet' = 'testnet') {
    this.network = network;
    
    const endpoint = network === 'mainnet'
      ? 'wss://xrplcluster.com'
      : 'wss://s.altnet.rippletest.net:51233';
    
    this.client = new Client(endpoint);
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.connect();
      console.log(`✅ Conectado ao XRPL ${this.network.toUpperCase()}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
    }
  }

  /**
   * Cria um Escrow para distribuição de aluguel
   * @param config Configuração do Escrow
   * @param wallet Carteira que cria o Escrow
   * @returns ID do Escrow criado
   */
  async createEscrow(
    config: EscrowConfig,
    wallet: Wallet
  ): Promise<EscrowInfo> {
    await this.connect();

    try {
      const releaseDateRipple = this.rippleTime(config.releaseDate);
      const rentPerToken = config.totalRent / config.totalTokens;

      // Criar Condição para o Escrow (hash das condições de distribuição)
      const condition = this.createCondition(config.propertyId, config.totalTokens);

      const tx: Transaction = {
        TransactionType: 'EscrowCreate',
        Account: wallet.address,
        Amount: config.totalRent.toString(),
        Destination: wallet.address, // Self-escrow até distribuição
        FinishAfter: releaseDateRipple,
        Condition: condition,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        const escrowId = result.result.hash;
        
        const escrowInfo: EscrowInfo = {
          id: escrowId,
          propertyId: config.propertyId,
          totalRent: config.totalRent,
          rentPerToken: rentPerToken,
          releaseDate: config.releaseDate,
          distributed: false,
          transactionHash: escrowId,
        };

        console.log(`✅ Escrow criado para ${config.propertyName}`);
        console.log(`   💰 R$ ${config.totalRent.toFixed(2)} para distribuição`);
        console.log(`   💵 R$ ${rentPerToken.toFixed(6)} por token`);
        console.log(`   📅 Release: ${config.releaseDate.toLocaleDateString('pt-BR')}`);

        return escrowInfo;
      } else {
        throw new Error('Falha ao criar Escrow');
      }
    } catch (error) {
      console.error('Erro ao criar Escrow:', error);
      throw error;
    }
  }

  /**
   * Finaliza o Escrow e distribui o aluguel
   * @param escrowId ID do Escrow
   * @param wallet Carteira que finaliza o Escrow
   * @param holders Lista de holders para distribuição
   * @returns Distribuições realizadas
   */
  async finishEscrow(
    escrowId: string,
    wallet: Wallet,
    holders: Array<{ address: string; tokens: number }>
  ): Promise<HolderDistribution[]> {
    await this.connect();

    try {
      // Buscar informações do Escrow
      const escrowInfo = await this.getEscrowInfo(escrowId);
      
      if (!escrowInfo) {
        throw new Error('Escrow não encontrado');
      }

      if (new Date() < escrowInfo.releaseDate) {
        throw new Error('Escrow ainda não pode ser liberado');
      }

      // Finalizar o Escrow
      const tx: Transaction = {
        TransactionType: 'EscrowFinish',
        Account: wallet.address,
        Owner: wallet.address,
        OfferSequence: escrowInfo.transactionHash,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        // Distribuir proporcionalmente
        const distributions = this.distributeRent(holders, escrowInfo);

        console.log(`✅ Escrow finalizado: ${escrowId}`);
        console.log(`   👥 ${distributions.length} holders receberam aluguel`);
        
        return distributions;
      } else {
        throw new Error('Falha ao finalizar Escrow');
      }
    } catch (error) {
      console.error('Erro ao finalizar Escrow:', error);
      throw error;
    }
  }

  /**
   * Cancela um Escrow antes do release date
   */
  async cancelEscrow(
    escrowId: string,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      const escrowInfo = await this.getEscrowInfo(escrowId);
      
      if (!escrowInfo) {
        throw new Error('Escrow não encontrado');
      }

      const tx: Transaction = {
        TransactionType: 'EscrowCancel',
        Account: wallet.address,
        Owner: wallet.address,
        OfferSequence: escrowId,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ Escrow cancelado: ${escrowId}`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao cancelar Escrow');
      }
    } catch (error) {
      console.error('Erro ao cancelar Escrow:', error);
      throw error;
    }
  }

  /**
   * Consulta informações de um Escrow
   */
  async getEscrowInfo(escrowId: string): Promise<EscrowInfo | null> {
    await this.connect();
    
    try {
      const tx = await this.client.request({
        command: 'tx',
        transaction: escrowId,
      });

      if (!tx.result || tx.result.TransactionType !== 'EscrowCreate') {
        return null;
      }

      const escrowCreate = tx.result;
      const metadata = JSON.parse(Buffer.from(escrowCreate.Condition, 'hex').toString());

      return {
        id: escrowId,
        propertyId: metadata.propertyId,
        totalRent: Number(escrowCreate.Amount),
        rentPerToken: Number(escrowCreate.Amount) / metadata.totalTokens,
        releaseDate: new Date(metadata.distributionDate),
        distributed: false,
        transactionHash: escrowId
      };
    } catch (error) {
      console.error('Erro ao buscar informações do Escrow:', error);
      return null;
    }
  }

  /**
   * Valida holders antes da distribuição
   */
  private async validateHolders(
    holders: Array<{ address: string; tokens: number }>,
    totalTokens: number
  ): Promise<boolean> {
    // Validar se a soma dos tokens corresponde ao total
    const sumTokens = holders.reduce((acc, h) => acc + h.tokens, 0);
    if (sumTokens !== totalTokens) {
      throw new Error(`Total de tokens inválido. Esperado: ${totalTokens}, Recebido: ${sumTokens}`);
    }

    // Validar cada holder
    for (const holder of holders) {
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: holder.address,
      }).catch(() => null);

      if (!accountInfo) {
        throw new Error(`Holder inválido: ${holder.address}`);
      }
    }

    return true;
  }

  /**
   * Calcula distribuição proporcional de aluguel
   */
  private distributeRent(
    holders: Array<{ address: string; tokens: number }>,
    escrowInfo: EscrowInfo
  ): HolderDistribution[] {
    return holders.map(holder => ({
      address: holder.address,
      tokens: holder.tokens,
      payment: holder.tokens * escrowInfo.rentPerToken,
      distributed: false,
    }));
  }

  /**
   * Cria condição para o Escrow (hash)
   */
  private createCondition(propertyId: string, totalTokens: number): string {
    const condition = JSON.stringify({
      propertyId,
      totalTokens,
      distributionDate: new Date().toISOString(),
    });
    
    // Em produção, usar hash SHA-256 da condição
    return convertStringToHex(condition);
  }

  /**
   * Converte data JavaScript para Ripple Time
   */
  private rippleTime(date: Date): number {
    const rippleEpoch = new Date('2000-01-01T00:00:00Z');
    const secondsSinceRippleEpoch = Math.floor((date.getTime() - rippleEpoch.getTime()) / 1000);
    return secondsSinceRippleEpoch;
  }
}

export default EscrowContract;
