'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import TradingModal from './TradingModal';
import PerformanceChart from './PerformanceChart';
import TransactionHistory from './TransactionHistory';

interface PortfolioItem {
  id: string;
  propertyId: string;
  propertyName: string;
  tokens: number;
  totalTokens: number;
  investment: number;
  currentValue: number;
  yieldReceived: number;
  percentOwned: number;
  pricePerToken: number;
}

interface PerformanceData {
  month: string;
  invested: number;
  currentValue: number;
  yield: number;
}

interface Transaction {
  id: string;
  hash: string;
  type: 'buy' | 'sell' | 'rent' | 'transfer';
  propertyName: string;
  tokens: number;
  value: number;
  date: Date;
  status: 'confirmed' | 'pending' | 'failed';
}

interface RentalPayment {
  id: string;
  propertyName: string;
  amount: number;
  tokensOwned: number;
  totalTokens: number;
  date: Date;
  status: 'pending' | 'received' | 'failed';
}

export default function Portfolio() {
  const { isConnected, address } = useWallet();
  const [selectedProperty, setSelectedProperty] = useState<PortfolioItem | null>(null);
  const [showTradingModal, setShowTradingModal] = useState(false);

  // Dados mock do portfolio
  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      propertyId: '1',
      propertyName: 'Apartamento - Copacabana',
      tokens: 625,
      totalTokens: 1000000,
      investment: 500,
      currentValue: 531.25,
      yieldReceived: 45,
      percentOwned: 0.0625,
      pricePerToken: 0.85,
    },
    {
      id: '2',
      propertyId: '3',
      propertyName: 'Casa - Praia do Futuro',
      tokens: 1333,
      totalTokens: 800000,
      investment: 1000,
      currentValue: 1100,
      yieldReceived: 120,
      percentOwned: 0.1666,
      pricePerToken: 0.82,
    },
  ];

  const performanceData: PerformanceData[] = [
    { month: 'Jan/24', invested: 1500, currentValue: 1500, yield: 0 },
    { month: 'Fev/24', invested: 1500, currentValue: 1525, yield: 25 },
    { month: 'Mar/24', invested: 1500, currentValue: 1550, yield: 75 },
    { month: 'Abr/24', invested: 1500, currentValue: 1580, yield: 130 },
    { month: 'Mai/24', invested: 1500, currentValue: 1610, yield: 185 },
    { month: 'Jun/24',
      invested: 1500,
      currentValue: 1631.25,
      yield: 225,
    },
  ];

  const escrowPayments = [
    {
      id: '1',
      propertyName: 'Apartamento - Copacabana',
      date: new Date(2024, 5, 5),
      amount: 0.006,
      tokens: 625,
      status: 'completed' as const,
    },
    {
      id: '2',
      propertyName: 'Casa - Praia do Futuro',
      date: new Date(2024, 4, 5),
      amount: 0.006,
      tokens: 1333,
      status: 'completed' as const,
    },
    {
      id: '3',
      propertyName: 'Apartamento - Copacabana',
      date: new Date(2024, 7, 5),
      amount: 0.006,
      tokens: 625,
      status: 'pending' as const,
    },
  ];

  const handleSell = (tokens: number, price: number) => {
    console.log('Vendendo tokens:', { tokens, price });
    alert(`${tokens} tokens vendidos com sucesso por R$ ${(tokens * price).toFixed(2)}!`);
    setShowTradingModal(false);
    setSelectedProperty(null);
  };

  const handleSellClick = (item: PortfolioItem) => {
    setSelectedProperty(item);
    setShowTradingModal(true);
  };

  // Mock transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      hash: '0x1234567890abcdef1234567890abcdef12345678',
      type: 'buy',
      propertyName: 'Apartamento - Copacabana',
      tokens: 625,
      value: 500,
      date: new Date('2024-06-15'),
      status: 'confirmed',
    },
    {
      id: '2',
      hash: '0xabcdef1234567890abcdef1234567890abcdef12',
      type: 'rent',
      propertyName: 'Apartamento - Copacabana',
      tokens: 625,
      value: 3.75,
      date: new Date('2024-07-05'),
      status: 'confirmed',
    },
    {
      id: '3',
      hash: '0x9876543210fedcba9876543210fedcba98765432',
      type: 'buy',
      propertyName: 'Casa - Praia do Futuro',
      tokens: 1333,
      value: 1000,
      date: new Date('2024-06-20'),
      status: 'confirmed',
    },
  ];

  // Mock rental payments
  const rentalPayments: RentalPayment[] = [
    {
      id: '1',
      propertyName: 'Apartamento - Copacabana',
      amount: 6000,
      tokensOwned: 625,
      totalTokens: 1000000,
      date: new Date('2024-07-05'),
      status: 'received',
    },
    {
      id: '2',
      propertyName: 'Casa - Praia do Futuro',
      amount: 7500,
      tokensOwned: 1333,
      totalTokens: 800000,
      date: new Date('2024-07-05'),
      status: 'received',
    },
  ];

  const totalInvestment = portfolioItems.reduce((sum, item) => sum + item.investment, 0);
  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const totalYield = portfolioItems.reduce((sum, item) => sum + item.yieldReceived, 0);
  const totalReturn = ((totalValue + totalYield - totalInvestment) / totalInvestment) * 100;

  if (!isConnected) {
    return (
      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meu Portfolio
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Conecte sua carteira para ver seus investimentos
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Meu Portfolio</h2>

        {/* Resumo do Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">Total Investido</div>
            <div className="text-3xl font-bold text-primary-700">
              R$ {totalInvestment.toLocaleString('pt-BR')}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">Valor Atual</div>
            <div className="text-3xl font-bold text-green-700">
              R$ {(totalValue + totalYield).toLocaleString('pt-BR')}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">Yield Recebido</div>
            <div className="text-3xl font-bold text-blue-700">
              R$ {totalYield.toLocaleString('pt-BR')}
            </div>
          </div>
          <div className={`bg-gradient-to-br p-6 rounded-xl ${
            totalReturn >= 0 ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'
          }`}>
            <div className="text-sm text-gray-600 mb-2">Retorno Total</div>
            <div className={`text-3xl font-bold ${
              totalReturn >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {totalReturn.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Lista de Investimentos */}
        <div className="space-y-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.propertyName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Tokens</div>
                      <div className="font-semibold text-gray-900">
                        {item.tokens.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Participação</div>
                      <div className="font-semibold text-gray-900">
                        {item.percentOwned.toFixed(4)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Investido</div>
                      <div className="font-semibold text-gray-900">
                        R$ {item.investment.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Valor Atual</div>
                      <div className="font-semibold text-green-600">
                        R$ {(item.currentValue + item.yieldReceived).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 space-y-2">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleSellClick(item)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Vender Tokens
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de Performance */}
        <div className="mt-12">
          <PerformanceChart data={performanceData} />
        </div>

        {/* Histórico de Transações */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Histórico de Transações</h3>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TransactionHistory transactions={[
              {
                id: '1',
                type: 'buy',
                property: 'Apartamento - Copacabana',
                propertyId: '1',
                tokens: 625,
                price: 0.8,
                total: 500,
                timestamp: new Date('2024-01-15'),
                status: 'completed',
                txHash: 'ABC123...',
              },
              {
                id: '2',
                type: 'rent',
                property: 'Apartamento - Copacabana',
                propertyId: '1',
                tokens: 625,
                price: 0.006,
                total: 3.75,
                timestamp: new Date('2024-02-05'),
                status: 'completed',
                txHash: 'DEF456...',
              },
              {
                id: '3',
                type: 'buy',
                property: 'Casa - Praia do Futuro',
                propertyId: '3',
                tokens: 1333,
                price: 0.75,
                total: 1000,
                timestamp: new Date('2024-02-20'),
                status: 'completed',
                txHash: 'GHI789...',
              },
            ]} />
          </div>
        </div>
      </div>

      {/* Modal de Trading */}
      {selectedProperty && showTradingModal && (
        <TradingModal
          isOpen={showTradingModal}
          onClose={() => {
            setShowTradingModal(false);
            setSelectedProperty(null);
          }}
          property={{
            id: selectedProperty.propertyId,
            title: selectedProperty.propertyName,
            pricePerToken: selectedProperty.pricePerToken,
          }}
          userTokens={selectedProperty.tokens}
          onSell={handleSell}
        />
      )}
    </section>
  );
}

