import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Wallet } from 'xrpl';

@Injectable()
export class XRPLService implements OnModuleInit {
  private client: Client;
  private network = process.env.XRPL_NETWORK || 'testnet';

  async onModuleInit() {
    const endpoint = this.network === 'mainnet' 
      ? 'wss://xrplcluster.com'
      : 'wss://s.altnet.rippletest.net:51233';
    
    this.client = new Client(endpoint);
    await this.client.connect();
    console.log('✅ Conectado ao XRPL:', this.network);
  }

  async createMPT(ownerAddress: string, metadataHash: string, totalSupply: number): Promise<string> {
    // TODO: Implementar criação real de MPT quando disponível
    console.log('Criando MPT:', { ownerAddress, metadataHash, totalSupply });
    
    return 'mpt_' + Date.now();
  }

  async createEscrow(propertyId: string, amount: string, condition: string): Promise<string> {
    try {
      // TODO: Implementar criação de Escrow real
      console.log('Criando Escrow:', { propertyId, amount });
      
      return 'escrow_' + Date.now();
    } catch (error) {
      console.error('Erro ao criar Escrow:', error);
      throw error;
    }
  }

  async submitTransaction(tx: any): Promise<string> {
    try {
      const response = await this.client.submit(tx);
      
      if (response.result.engine_result === 'tesSUCCESS' || response.result.accepted) {
        return response.result.tx_json.hash || response.result.tx_blob;
      }
      
      throw new Error('Transação falhou: ' + response.result.engine_result);
    } catch (error) {
      console.error('Erro ao submeter transação:', error);
      throw error;
    }
  }

  async getAccountInfo(address: string) {
    try {
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: address,
      });
      
      return accountInfo.result;
    } catch (error) {
      console.error('Erro ao buscar account info:', error);
      throw error;
    }
  }

  async createOffer(
    account: string,
    takerPays: string,
    takerGets: string,
  ): Promise<string> {
    try {
      const tx = {
        TransactionType: 'OfferCreate',
        Account: account,
        TakerPays: takerPays,
        TakerGets: takerGets,
      };
      
      return await this.submitTransaction(tx);
    } catch (error) {
      console.error('Erro ao criar offer:', error);
      throw error;
    }
  }
}

