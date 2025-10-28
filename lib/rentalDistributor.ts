/**
 * Serviço de Distribuição de Aluguel via Escrow
 * 
 * Este módulo implementa a lógica para distribuir aluguéis
 * proporcionalmente aos holders de tokens de cada imóvel.
 */

export interface RentalPayment {
  propertyId: string;
  propertyName: string;
  totalRent: number;
  totalTokens: number;
  rentPerToken: number;
  timestamp: Date;
}

export interface HolderPayment {
  holderAddress: string;
  tokensOwned: number;
  rentReceived: number;
}

export class RentalDistributor {
  /**
   * Calcula o valor de aluguel por token
   */
  static calculateRentPerToken(
    totalRent: number,
    totalTokens: number
  ): number {
    return totalRent / totalTokens;
  }

  /**
   * Calcula o aluguel recebido por um holder
   */
  static calculateHolderRent(
    holderTokens: number,
    rentPerToken: number
  ): number {
    return holderTokens * rentPerToken;
  }

  /**
   * Cria uma distribuição de aluguel completa
   */
  static createRentalDistribution(
    propertyId: string,
    propertyName: string,
    totalRent: number,
    totalTokens: number
  ): RentalPayment {
    const rentPerToken = this.calculateRentPerToken(totalRent, totalTokens);

    return {
      propertyId,
      propertyName,
      totalRent,
      totalTokens,
      rentPerToken,
      timestamp: new Date(),
    };
  }

  /**
   * Distribui aluguel para múltiplos holders
   */
  static distributeRent(
    rentalPayment: RentalPayment,
    holders: Array<{ address: string; tokens: number }>
  ): HolderPayment[] {
    return holders.map(holder => ({
      holderAddress: holder.address,
      tokensOwned: holder.tokens,
      rentReceived: this.calculateHolderRent(
        holder.tokens,
        rentalPayment.rentPerToken
      ),
    }));
  }

  /**
   * Valida se um pagamento de aluguel é válido
   */
  static validateRentalPayment(
    totalRent: number,
    totalTokens: number
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (totalRent <= 0) {
      errors.push('Valor de aluguel deve ser maior que zero');
    }

    if (totalTokens <= 0) {
      errors.push('Número de tokens deve ser maior que zero');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Gera um resumo da distribuição
   */
  static generateSummary(
    rentalPayment: RentalPayment,
    holderPayments: HolderPayment[]
  ): string {
    const totalDistributed = holderPayments.reduce(
      (sum, h) => sum + h.rentReceived,
      0
    );

    return `
📊 Distribuição de Aluguel - ${rentalPayment.propertyName}

💰 Aluguel Total: R$ ${rentalPayment.totalRent.toLocaleString('pt-BR')}
🎫 Total de Tokens: ${rentalPayment.totalTokens.toLocaleString('pt-BR')}
💵 Valor por Token: R$ ${rentalPayment.rentPerToken.toFixed(4)}
👥 Beneficiários: ${holderPayments.length}
📦 Total Distribuído: R$ ${totalDistributed.toLocaleString('pt-BR')}
    `.trim();
  }
}

/**
 * Exemplo de uso:
 * 
 * const rentalPayment = RentalDistributor.createRentalDistribution(
 *   'apt-001',
 *   'Apartamento - Copacabana',
 *   6000,  // R$ 6.000 de aluguel
 *   1000000 // 1.000.000 tokens
 * );
 * 
 * const holders = [
 *   { address: 'rAbc123...', tokens: 625 },
 *   { address: 'rXyz789...', tokens: 1000 },
 * ];
 * 
 * const distributions = RentalDistributor.distributeRent(rentalPayment, holders);
 * // Ana receberá: 625 * 0.006 = R$ 3,75
 * // Carlos receberá: 1000 * 0.006 = R$ 6,00
 */

