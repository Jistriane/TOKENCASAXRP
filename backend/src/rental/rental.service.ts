import { Injectable } from '@nestjs/common';

@Injectable()
export class RentalService {
  async processRentPayment(paymentData: any) {
    console.log('Processando pagamento de aluguel:', paymentData);
    
    // Validação do pagamento
    const isValid = await this.validatePayment(paymentData);
    
    if (isValid) {
      // Trigger distribuição via Escrow
      return {
        success: true,
        rentalPaymentId: 'rent_' + Date.now(),
        distributed: true,
      };
    }
    
    return { success: false, error: 'Pagamento inválido' };
  }

  async getRentalHistory(propertyId: string) {
    // Mock data
    return [
      {
        date: '2024-06-05',
        amount: 6000,
        tenants: 10,
        status: 'received',
      },
      {
        date: '2024-05-05',
        amount: 6000,
        tenants: 10,
        status: 'received',
      },
    ];
  }

  async distributeRent(distributionData: any) {
    const { propertyId, totalRent, holders } = distributionData;
    const totalTokens = holders.reduce((sum: number, h: any) => sum + h.tokens, 0);
    const rentPerToken = totalRent / totalTokens;
    
    const distributions = holders.map((holder: any) => ({
      address: holder.address,
      tokens: holder.tokens,
      payment: holder.tokens * rentPerToken,
      calculatedAt: new Date(),
    }));
    
    return {
      success: true,
      propertyId,
      totalRent,
      rentPerToken,
      distributions,
    };
  }

  private async validatePayment(paymentData: any): Promise<boolean> {
    // Em produção, validaria com property manager API
    return true;
  }
}
