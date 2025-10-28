import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OraclesService {
  private chainlinkUrl = process.env.CHAINLINK_URL || 'https://api.chainlink.com';

  /**
   * Busca preço de imóvel via Chainlink Oracle
   */
  async getPropertyPrice(propertyAddress: string): Promise<number> {
    try {
      // Em produção, integraria com Chainlink
      const response = await axios.get(`${this.chainlinkUrl}/price/${propertyAddress}`);
      return response.data.price;
    } catch (error) {
      console.log('Chainlink não configurado. Usando mock data.');
      
      // Mock para desenvolvimento
      return this.generateMockPrice(propertyAddress);
    }
  }

  /**
   * Busca valor venal de imóvel
   */
  async getAssessedValue(propertyAddress: string): Promise<number> {
    try {
      // Integração com APIs de avaliação imobiliária
      const response = await axios.get(`https://api.propertyvalue.com/${propertyAddress}`);
      return response.data.assessedValue;
    } catch (error) {
      console.log('API de avaliação não configurada. Usando mock.');
      
      // Mock baseado em localização
      return this.estimatePropertyValue(propertyAddress);
    }
  }

  /**
   * Verifica pagamento de aluguel recebido
   */
  async verifyRentPayment(propertyId: string, expectedAmount: number): Promise<boolean> {
    try {
      // Em produção, verificaria via API do property manager
      const apiUrl = process.env.PROPERTY_MANAGER_API;
      
      if (apiUrl) {
        const response = await axios.post(`${apiUrl}/verify-payment`, {
          propertyId,
          amount: expectedAmount,
        });
        
        return response.data.verified;
      }
      
      // Mock para desenvolvimento
      console.log('API de aluguel não configurada. Simulando pagamento.');
      return true;
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      return false;
    }
  }

  /**
   * Busca yield atual do imóvel
   */
  async getPropertyYield(propertyId: string): Promise<number> {
    try {
      // Cálculo baseado em aluguel recebido e valor do imóvel
      const rentData = await this.getMonthlyRent(propertyId);
      const propertyPrice = await this.getPropertyPrice(propertyId);
      
      const annualYield = (rentData * 12 / propertyPrice) * 100;
      return annualYield;
    } catch (error) {
      console.log('Usando yield mockado');
      return 9.5; // Mock
    }
  }

  /**
   * Gera preço mockado baseado em endereço
   */
  private generateMockPrice(address: string): number {
    // Baseado em CEP
    let basePrice = 500000;
    
    if (address.includes('Rio de Janeiro') || address.includes('São Paulo')) {
      basePrice = 800000;
    } else if (address.includes('Fortaleza') || address.includes('Salvador')) {
      basePrice = 600000;
    }
    
    return basePrice;
  }

  /**
   * Estima valor de imóvel
   */
  private estimatePropertyValue(address: string): number {
    return this.generateMockPrice(address);
  }

  /**
   * Busca aluguel mensal
   */
  private async getMonthlyRent(propertyId: string): Promise<number> {
    // Mock
    return 6000;
  }
}

