/**
 * API Service - Integração com Backend NestJS
 */

// Usa API routes do Next.js diretamente
const API_URL = '/api';

export interface Property {
  id: string;
  title: string;
  address: string;
  totalPrice: number;
  totalTokens: number;
  pricePerToken: number;
  yieldAnnual: number;
  type: 'residencial' | 'comercial';
  area: number;
  description: string;
  images: string[];
  tokenized: boolean;
}

class ApiService {
  /**
   * Busca todos os imóveis
   */
  async getProperties(): Promise<Property[]> {
    try {
      const response = await fetch(`${API_URL}/properties`);
      const data = await response.json();
      return data.properties || [];
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      return [];
    }
  }

  /**
   * Busca um imóvel específico
   */
  async getProperty(id: string): Promise<Property | null> {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
      return null;
    }
  }

  /**
   * Tokeniza um imóvel
   */
  async tokenizeProperty(id: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao tokenizar imóvel:', error);
      throw error;
    }
  }

  /**
   * Cria um novo imóvel
   */
  async createProperty(property: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      throw error;
    }
  }

  /**
   * Verifica KYC
   */
  async verifyKYC(kycData: any): Promise<any> {
    // Mock implementation - KYC será implementado via XRPL Credentials
    return {
      success: true,
      verified: true,
      credentialHash: 'mock_credential_hash',
      message: 'KYC mock verificado'
    };
  }

  /**
   * Distribui aluguel via Escrow
   */
  async distributeRent(distributionData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/escrow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distributionData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao distribuir aluguel:', error);
      throw error;
    }
  }

  /**
   * Busca histórico de transações
   */
  async getTransactions(): Promise<any[]> {
    // Mock implementation - transações virão do XRPL
    return [
      {
        id: 'tx_1',
        type: 'buy',
        propertyId: '1',
        tokens: 625,
        value: 500,
        timestamp: new Date(),
        txHash: 'mock_tx_hash',
      }
    ];
  }
}

export const apiService = new ApiService();

