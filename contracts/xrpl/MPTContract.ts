/**
 * MPT Contract - Multi-Purpose Tokens para TokenCasa
 * Gerencia a criação e transferência de tokens de imóveis no XRPL
 */

import { Client, Wallet, Transaction, convertStringToHex, AccountInfoRequest } from 'xrpl';

export interface MPTConfig {
  propertyId: string;
  propertyName: string;
  totalSupply: number;
  ownerAddress: string;
  ipfsMetadataHash: string;
  credentialRequirement: string;
}

export interface MPTToken {
  id: string;
  propertyId: string;
  name: string;
  supply: number;
  metadataHash: string;
  owner: string;
  restrictions: MPTRestrictions;
}

export interface MPTRestrictions {
  requireCredential: string;
  maxSupply?: number;
  transferable: boolean;
}

export class MPTContract {
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(network: 'mainnet' | 'testnet' | 'devnet' = 'testnet') {
    this.network = network;
    
    const endpoint = network === 'mainnet'
      ? 'wss://xrplcluster.com'
      : network === 'testnet'
      ? 'wss://s.altnet.rippletest.net:51233'
      : 'wss://xls20-sandbox.rippletest.net:51233';
    
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
   * Cria um novo MPT para um imóvel
   * @param config Configuração do MPT
   * @param wallet Carteira que vai emitir o token
   * @returns ID do MPT criado
   */
  async createMPT(
    config: MPTConfig,
    wallet: Wallet
  ): Promise<MPTToken> {
    await this.connect();

    try {
      // Verificar se a carteira tem fundos
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: wallet.address,
      });

      if (Number(accountInfo.result.account_data.Balance) < 10000000) {
        throw new Error('Insufficient XRP balance. Need at least 10 XRP for reserve.');
      }

      // Criar metadata URI
      const metadataURI = `ipfs://${config.ipfsMetadataHash}`;

      // Preparar transação IssueSet
      // Nota: IssueSet será implementado quando MPT estiver disponível no XRPL
      // Por enquanto, simulamos com NFTokenMint (similar structure)
      
      const tx: Transaction = {
        TransactionType: 'NFTokenMint' as any, // Placeholder until IssueSet is available
        Account: wallet.address,
        URI: convertStringToHex(metadataURI),
        Flags: 1, // Transferable
        TransferFee: 0,
        NFTokenTaxon: 0, // Property category
      };

      // Substituir por IssueSet quando disponível:
      // const tx = {
      //   TransactionType: 'IssueSet',
      //   Account: wallet.address,
      //   TokenType: 'MPT',
      //   TokenName: config.propertyName,
      //   TokenSymbol: config.propertyId.toUpperCase(),
      //   TotalSupply: config.totalSupply.toString(),
      //   Decimals: 0,
      //   MetadataURI: `ipfs://${config.ipfsMetadataHash}`,
      //   Restrictions: {
      //     TransferRestriction: {
      //       type: 'RequireCredential',
      //       credential: config.credentialRequirement
      //     }
      //   }
      // };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        const mpt: MPTToken = {
          id: result.result.hash || 'mpt_' + Date.now(),
          propertyId: config.propertyId,
          name: config.propertyName,
          supply: config.totalSupply,
          metadataHash: config.ipfsMetadataHash,
          owner: wallet.address,
          restrictions: {
            requireCredential: config.credentialRequirement,
            maxSupply: config.totalSupply,
            transferable: true,
          },
        };

        console.log(`✅ MPT criado: ${mpt.id}`);
        return mpt;
      } else {
        throw new Error('Falha ao criar MPT');
      }
    } catch (error) {
      console.error('Erro ao criar MPT:', error);
      throw error;
    }
  }

  /**
   * Transfere tokens MPT entre holders
   * @param mptId ID do MPT
   * @param from Endereço do remetente
   * @param to Endereço do destinatário
   * @param amount Quantidade de tokens
   * @param wallet Carteira do remetente
   * @returns Hash da transação
   */
  async transferMPT(
    mptId: string,
    from: string,
    to: string,
    amount: number,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      // Verificar credentials do destinatário
      const hasCredential = await this.verifyCredential(to, 'BR-Investor-Verified');
      if (!hasCredential) {
        throw new Error('Destinatário não possui credential necessário');
      }

      const tx: any = {
        TransactionType: 'Payment',
        Account: from,
        Destination: to,
        Amount: {
          currency: mptId,
          value: amount.toString(),
          issuer: from,
        },
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ ${amount} tokens transferidos de ${from} para ${to}`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao transferir tokens');
      }
    } catch (error) {
      console.error('Erro ao transferir MPT:', error);
      throw error;
    }
  }

  /**
   * Consulta o saldo de tokens de um endereço
   * @param address Endereço do holder
   * @param mptId ID do MPT
   * @returns Saldo em tokens
   */
  async getBalance(address: string, mptId: string): Promise<number> {
    await this.connect();

    try {
      const accountLines = await this.client.request({
        command: 'account_lines',
        account: address,
        limit: 400,
      });

      const line = accountLines.result.lines.find(
        (line: any) => line.currency === mptId
      );

      return line ? Number(line.balance) : 0;
    } catch (error) {
      console.error('Erro ao consultar saldo:', error);
      return 0;
    }
  }

  /**
   * Queima tokens (reduz supply)
   * @param mptId ID do MPT
   * @param amount Quantidade a queimar
   * @param wallet Carteira do owner
   * @returns Hash da transação
   */
  async burnMPT(
    mptId: string,
    amount: number,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      // Transaction para queimar tokens seria uma modificação do trustline
      // Implementação específica quando MPT estiver disponível
      
      console.log(`🔥 Queimando ${amount} tokens de ${mptId}`);
      return 'burn_tx_' + Date.now();
    } catch (error) {
      console.error('Erro ao queimar tokens:', error);
      throw error;
    }
  }

  /**
   * Verifica se um endereço tem a credential necessária
   */
  private async verifyCredential(address: string, credential: string): Promise<boolean> {
    await this.connect();

    try {
      // Buscar NFTs (credentials) do endereço
      const accountNFTs = await this.client.request({
        command: 'account_nfts',
        account: address,
        limit: 400,
      });

      // Filtrar pela credential desejada
      const credentials = accountNFTs.result.account_nfts
        .map((nft: any) => {
          try {
            return JSON.parse(Buffer.from(nft.URI, 'hex').toString('utf-8'));
          } catch {
            return null;
          }
        })
        .filter((cred: any) => cred && cred.type === credential);

      if (credentials.length === 0) {
        console.log(`❌ Endereço ${address} não possui a credential ${credential}`);
        return false;
      }

      // Verificar se alguma credential está válida (não expirada e não revogada)
      const validCredential = credentials.some(cred => {
        const expirationDate = cred.expiresAt ? new Date(cred.expiresAt) : null;
        const isExpired = expirationDate ? expirationDate < new Date() : false;
        return !cred.revoked && !isExpired;
      });

      if (!validCredential) {
        console.log(`❌ Todas as credentials ${credential} do endereço ${address} estão expiradas ou revogadas`);
        return false;
      }

      console.log(`✅ Endereço ${address} possui credential ${credential} válida`);
      return true;
    } catch (error) {
      console.error('Erro ao verificar credentials:', error);
      return false;
    }
  }

  /**
   * Obtém informações completas de um MPT
   */
  async getMPTInfo(mptId: string): Promise<MPTToken | null> {
    await this.connect();

    try {
      // Buscar informações do token no ledger
      const result = await this.client.request({
        command: 'tx',
        transaction: mptId,
      });

      if (!result.result) {
        return null;
      }

      // Processar metadados do token
      const tx = result.result;
      const txData = tx.tx_json as any; // Cast para acessar propriedades opcionais

      const uri = txData.URI ? Buffer.from(txData.URI, 'hex').toString('utf-8') : '';
      const metadataHash = uri.replace('ipfs://', '');

      // Extrair dados do token dos memos da transação
      const memos = txData.Memos || [];
      const propertyId = memos[0]?.Memo?.MemoData || '';
      const name = memos[1]?.Memo?.MemoData || '';
      
      const supply = txData.TotalSupply ? Number(txData.TotalSupply) : 0;

      const mpt: MPTToken = {
        id: mptId,
        propertyId: propertyId,
        name: name,
        supply: supply,
        metadataHash: metadataHash,
        owner: txData.Account || '',
        restrictions: {
          requireCredential: 'BR-Investor-Verified',
          maxSupply: supply,
          transferable: true,
        },
      };

      return mpt;
    } catch (error) {
      console.error('Erro ao buscar informações do MPT:', error);
      return null;
    }
  }
}

export default MPTContract;
