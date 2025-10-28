/**
 * API Service - Integração com Backend NestJS
 */

// Usa API routes do Next.js para proxy para o backend
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/backend';

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
      const response = await fetch(`${API_URL}/api/properties`);
      const data = await response.json();
      return data;
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
      const response = await fetch(`${API_URL}/api/properties/${id}`);
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
      const response = await fetch(`${API_URL}/api/properties/${id}/tokenize`, {
        method: 'POST',
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
      const response = await fetch(`${API_URL}/api/properties`, {
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
    try {
      const response = await fetch(`${API_URL}/api/users/kyc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kycData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao verificar KYC:', error);
      throw error;
    }
  }

  /**
   * Distribui aluguel via Escrow
   */
  async distributeRent(distributionData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/api/escrow/distribute`, {
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
    try {
      const response = await fetch(`${API_URL}/api/transactions`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }
  }
}

export const apiService = new ApiService();

