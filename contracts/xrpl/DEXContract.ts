/**
 * DEX Contract - Decentralized Exchange para TokenCasa
 * Gerencia ordens de compra/venda de tokens MPT
 */

import { Client, Wallet, Transaction, IssuedCurrencyAmount } from 'xrpl';

export interface OrderConfig {
  account: string;
  takerPays: string | IssuedCurrencyAmount;
  takerGets: string | IssuedCurrencyAmount;
  expiration?: number;
}

export interface Offer {
  id: string;
  account: string;
  takerPays: string | IssuedCurrencyAmount;
  takerGets: string | IssuedCurrencyAmount;
  expiration: number;
  sequence: number;
}

export class DEXContract {
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
   * Cria uma ordem de compra no DEX
   */
  async createBuyOrder(
    config: OrderConfig,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      const tx: Transaction = {
        TransactionType: 'OfferCreate',
        Account: wallet.address,
        TakerPays: config.takerPays,
        TakerGets: config.takerGets,
        Expiration: config.expiration,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ Ordem de compra criada`);
        console.log(`   Taker Pays: ${JSON.stringify(config.takerPays)}`);
        console.log(`   Taker Gets: ${JSON.stringify(config.takerGets)}`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao criar ordem de compra');
      }
    } catch (error) {
      console.error('Erro ao criar ordem de compra:', error);
      throw error;
    }
  }

  /**
   * Cria uma ordem de venda no DEX
   */
  async createSellOrder(
    config: OrderConfig,
    wallet: Wallet
  ): Promise<string> {
    // Mesma lógica que createBuyOrder, apenas inverter takerPays e takerGets
    return this.createBuyOrder(config, wallet);
  }

  /**
   * Cancela uma ordem pendente
   */
  async cancelOrder(
    offerSequence: number,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      const tx: Transaction = {
        TransactionType: 'OfferCancel',
        Account: wallet.address,
        OfferSequence: offerSequence,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ Ordem cancelada: ${offerSequence}`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao cancelar ordem');
      }
    } catch (error) {
      console.error('Erro ao cancelar ordem:', error);
      throw error;
    }
  }

  /**
   * Consulta o order book (livro de ordens)
   */
  async getOrderBook(
    takerGets: IssuedCurrencyAmount,
    takerPays: IssuedCurrencyAmount
  ): Promise<any> {
    await this.connect();

    try {
      const orderBook = await this.client.request({
        command: 'book_offers',
        taker_gets: takerGets,
        taker_pays: takerPays,
        limit: 50,
      });

      return orderBook.result.offers;
    } catch (error) {
      console.error('Erro ao consultar order book:', error);
      return [];
    }
  }

  /**
   * Lista todas as ordens pendentes de uma conta
   */
  async getAccountOrders(address: string): Promise<Offer[]> {
    await this.connect();

    try {
      const accountOffers = await this.client.request({
        command: 'account_offers',
        account: address,
        limit: 400,
      });

      return (accountOffers.result.offers || []).map((offer: any) => ({
        id: offer.index,
        account: address,
        takerPays: offer.taker_pays,
        takerGets: offer.taker_gets,
        expiration: offer.expiration || 0,
        sequence: offer.seq,
      }));
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      return [];
    }
  }

  /**
   * Simula um trade via AMM (Automated Market Maker)
   */
  async tradeOnAMM(
    wallet: Wallet,
    mptToken: string,
    sellToken: string,
    amount: string
  ): Promise<string> {
    await this.connect();

    try {
      // Implementação de AMM seria através de AMMDeposit ou AMMSwap
      // Por enquanto, simulação com OfferCreate
      
      console.log(`📈 Trading via AMM: ${amount} ${sellToken} → ${mptToken}`);
      return 'amm_trade_' + Date.now();
    } catch (error) {
      console.error('Erro ao tradear no AMM:', error);
      throw error;
    }
  }

  /**
   * Calcula o slippage de uma ordem
   */
  async calculateSlippage(
    offer: OrderConfig
  ): Promise<{ slippagePercent: number; estimatedPrice: number }> {
    // Calcular slippage baseado na profundidade do order book
    return {
      slippagePercent: 0.5, // Mock
      estimatedPrice: 1.0,
    };
  }
}

export default DEXContract;
