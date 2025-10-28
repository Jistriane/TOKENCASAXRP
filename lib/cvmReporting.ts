/**
 * Sistema de Reporting Automático para CVM
 * Registra todas as transações de tokens conforme regulamentação brasileira
 */

export interface CVMTransaction {
  timestamp: Date;
  transactionHash: string;
  propertyId: string;
  propertyName: string;
  traderAddress: string;
  traderCPF?: string;
  transactionType: 'BUY' | 'SELL' | 'DISTRIBUTION';
  quantity: number;
  price: number;
  totalValue: number;
  tax?: number;
}

export class CVMReporting {
  private transactions: CVMTransaction[] = [];

  /**
   * Registra uma transação para reportar à CVM
   */
  async registerTransaction(transaction: CVMTransaction): Promise<void> {
    this.transactions.push(transaction);
    
    console.log('Transação registrada para CVM:', {
      timestamp: transaction.timestamp,
      property: transaction.propertyName,
      type: transaction.transactionType,
      value: transaction.totalValue,
    });

    // Em produção:
    // 1. Validar compliance KYC/AML
    // 2. Verificar limites de investimento
    // 3. Registar no banco de dados
    // 4. Enviar para API da CVM (se necessário)
  }

  /**
   * Busca transações por endereço
   */
  getTransactionsByAddress(address: string): CVMTransaction[] {
    return this.transactions.filter(t => t.traderAddress === address);
  }

  /**
   * Busca transações por propriedade
   */
  getTransactionsByProperty(propertyId: string): CVMTransaction[] {
    return this.transactions.filter(t => t.propertyId === propertyId);
  }

  /**
   * Gera relatório mensal para CVM
   */
  async generateMonthlyReport(month: number, year: number): Promise<any> {
    const monthTransactions = this.transactions.filter(t => {
      const date = t.timestamp;
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

    const report = {
      period: { month, year },
      totalTransactions: monthTransactions.length,
      totalVolume: monthTransactions.reduce((sum, t) => sum + t.totalValue, 0),
      totalPropertyTokens: new Set(monthTransactions.map(t => t.propertyId)).size,
      transactionsByType: {
        BUY: monthTransactions.filter(t => t.transactionType === 'BUY').length,
        SELL: monthTransactions.filter(t => t.transactionType === 'SELL').length,
        DISTRIBUTION: monthTransactions.filter(t => t.transactionType === 'DISTRIBUTION').length,
      },
      topProperties: this.getTopProperties(monthTransactions),
    };

    return report;
  }

  /**
   * Busca propriedades mais negociadas
   */
  private getTopProperties(transactions: CVMTransaction[]): any[] {
    const propertyCounts = new Map<string, number>();
    
    transactions.forEach(t => {
      const count = propertyCounts.get(t.propertyId) || 0;
      propertyCounts.set(t.propertyId, count + 1);
    });

    return Array.from(propertyCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([propertyId, count]) => ({
        propertyId,
        count,
      }));
  }

  /**
   * Calcula impostos sobre transações
   */
  calculateTax(transaction: CVMTransaction): number {
    // Isento para Pessoas Físicas até R$ 35k/mês em operações day trade
    // Taxa padrão de 15% sobre ganho de capital
    const threshold = 35000;
    
    if (transaction.totalValue > threshold) {
      return transaction.totalValue * 0.15;
    }
    
    return 0;
  }
}

export const cvmReporting = new CVMReporting();

