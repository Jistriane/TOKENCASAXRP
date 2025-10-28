import { Injectable } from '@nestjs/common';

@Injectable()
export class EscrowService {
  async distribute(distributionData: any) {
    console.log('Distribuindo aluguel via Escrow:', distributionData);
    
    const { propertyId, totalRent, totalTokens, holders } = distributionData;
    const rentPerToken = totalRent / totalTokens;
    
    const distributions = holders.map((holder: any) => ({
      address: holder.address,
      tokens: holder.tokens,
      payment: holder.tokens * rentPerToken,
      distributedAt: new Date(),
    }));
    
    return {
      success: true,
      propertyId,
      totalRent,
      rentPerToken,
      distributions,
    };
  }

  async getHistory() {
    return [];
  }
}

