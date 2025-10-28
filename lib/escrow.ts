/**
 * Sistema de Distribuição de Aluguel via Escrow
 * Simula o comportamento de um Escrow nativo do XRPL
 */

export interface EscrowPayment {
  propertyId: string;
  propertyName: string;
  totalRent: number;
  totalTokens: number;
  rentPerToken: number;
  timestamp: Date;
  distributed: boolean;
}

export interface HolderBalance {
  address: string;
  tokens: number;
  payment: number;
}

/**
 * Calcula a distribuição de aluguel para todos os holders
 */
export function calculateEscrowDistribution(
  totalRent: number,
  totalTokens: number,
  holderBalances: HolderBalance[]
): { perToken: number; totalDistributed: number; distributions: HolderBalance[] } {
  const rentPerToken = totalRent / totalTokens;

  const distributions = holderBalances.map(holder => ({
    ...holder,
    payment: holder.tokens * rentPerToken,
  }));

  const totalDistributed = distributions.reduce((sum, d) => sum + d.payment, 0);

  return {
    perToken: rentPerToken,
    totalDistributed,
    distributions,
  };
}

/**
 * Simula a distribuição mensal de aluguel
 */
export function simulateMonthlyRent(
  propertyId: string,
  propertyName: string,
  totalRent: number,
  totalTokens: number,
  holderBalances: HolderBalance[]
): EscrowPayment & { distributions: HolderBalance[] } {
  const { perToken, distributions } = calculateEscrowDistribution(
    totalRent,
    totalTokens,
    holderBalances
  );

  return {
    propertyId,
    propertyName,
    totalRent,
    totalTokens,
    rentPerToken: perToken,
    timestamp: new Date(),
    distributed: true,
    distributions,
  };
}

/**
 * Notificação de aluguel recebido
 */
export function generateRentNotification(
  propertyName: string,
  payment: number,
  timestamp: Date
): string {
  return `💸 Você recebeu R$ ${payment.toFixed(2)} de aluguel do ${propertyName} em ${timestamp.toLocaleString('pt-BR')}`;
}

