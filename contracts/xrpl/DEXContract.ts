/**
 * DEX Contract - Decentralized Exchange para TokenCasa
 * Gerencia ordens de compra/venda de tokens MPT
 */

import { Client, Wallet, IssuedCurrencyAmount } from 'xrpl';
import { 
  OfferCreateTransaction,
  OfferCancelTransaction,
  AMMDepositTransaction,
  AMMInfo
} from './types';

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
      const tx = {
        TransactionType: 'OfferCreate',
        Account: wallet.address,
        TakerPays: config.takerPays,
        TakerGets: config.takerGets,
        Expiration: config.expiration,
      } as any;

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
      const tx = {
        TransactionType: 'OfferCancel',
        Account: wallet.address,
        OfferSequence: offerSequence,
      } as any;

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
   * Executa um trade via AMM (Automated Market Maker)
   */
  async tradeOnAMM(
    wallet: Wallet,
    mptToken: string,
    sellToken: string,
    amount: string
  ): Promise<string> {
    await this.connect();

    try {
      // Verificar liquidez do pool
      const poolInfo = await this.getAMMPoolInfo(mptToken, sellToken);
      if (!poolInfo || poolInfo.liquidity < Number(amount)) {
        throw new Error('Liquidez insuficiente no pool');
      }

      // Calcular preço e slippage
      const slippage = await this.calculateSlippage({
        account: wallet.address,
        takerPays: amount,
        takerGets: mptToken
      });

      if (slippage.slippagePercent > 5) {
        throw new Error('Slippage muito alto (>5%)');
      }

      // Executar swap via AMM
      const tx = {
        TransactionType: 'AMMDeposit',
        Account: wallet.address,
        Asset: {
          currency: sellToken,
          value: amount,
          issuer: wallet.address
        },
        Asset2: {
          currency: mptToken,
          issuer: wallet.address
        },
        Flags: 1, // tfLimitPriceSlippage
        LPToken: {
          currency: `LP-${mptToken}-${sellToken}`,
          issuer: wallet.address
        }
      } as any;

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ AMM Trade executado`);
        console.log(`   ${amount} ${sellToken} → ${mptToken}`);
        console.log(`   Slippage: ${slippage.slippagePercent.toFixed(2)}%`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao executar trade no AMM');
      }
    } catch (error) {
      console.error('Erro ao tradear no AMM:', error);
      throw error;
    }
  }

  /**
   * Calcula o slippage de uma ordem baseado na profundidade do order book
   */
  async calculateSlippage(
    offer: OrderConfig
  ): Promise<{ slippagePercent: number; estimatedPrice: number }> {
    await this.connect();

    try {
      // Obter order book
      const orderBook = await this.getOrderBook(
        offer.takerGets as IssuedCurrencyAmount,
        offer.takerPays as IssuedCurrencyAmount
      );

      if (!orderBook || orderBook.length === 0) {
        return {
          slippagePercent: 100,
          estimatedPrice: 0
        };
      }

      // Calcular preço médio do mercado
      const marketPrice = orderBook.reduce((acc: number, order: any) => {
        const price = Number(order.quality);
        return acc + price;
      }, 0) / orderBook.length;

      // Calcular profundidade do mercado
      const depth = orderBook.reduce((acc: number, order: any) => {
        return acc + Number(order.TakerGets.value || order.TakerGets);
      }, 0);

      // Calcular slippage baseado no tamanho da ordem vs profundidade
      const orderSize = Number(offer.takerPays);
      const slippagePercent = (orderSize / depth) * 100;

      return {
        slippagePercent: Math.min(slippagePercent, 100),
        estimatedPrice: marketPrice
      };
    } catch (error) {
      console.error('Erro ao calcular slippage:', error);
      return {
        slippagePercent: 100,
        estimatedPrice: 0
      };
    }
  }

  /**
   * Obtém informações sobre um pool de liquidez AMM
   */
  private async getAMMPoolInfo(
    token1: string,
    token2: string
  ): Promise<{ liquidity: number; price: number } | null> {
    try {
      // Por enquanto, simular liquidez usando o order book
      // No futuro, quando AMM estiver disponível no XRPL, usar comando amm_info
      const orderBook = await this.getOrderBook(
        {
          currency: token1,
          issuer: this.getTokenIssuer(token1)
        } as IssuedCurrencyAmount,
        {
          currency: token2,
          issuer: this.getTokenIssuer(token2)
        } as IssuedCurrencyAmount
      );

      if (!orderBook || orderBook.length === 0) {
        return null;
      }

      // Simular liquidez baseado na profundidade do order book
      const liquidity = orderBook.reduce((acc: number, order: any) => {
        return acc + Number(order.TakerGets.value || order.TakerGets);
      }, 0);

      // Simular preço usando a média do order book
      const price = orderBook.reduce((acc: number, order: any) => {
        return acc + Number(order.quality);
      }, 0) / orderBook.length;

      return { liquidity, price };
    } catch (error) {
      console.error('Erro ao buscar informações do pool AMM:', error);
      return null;
    }
  }

  private getTokenIssuer(token: string): string {
    // TODO: Implementar lógica para buscar issuer correto do token
    // Por enquanto retorna um issuer fixo para desenvolvimento
    return 'rTokenCasaIssuerAddressXXXXXXXXXX';
  }
}

export default DEXContract;
