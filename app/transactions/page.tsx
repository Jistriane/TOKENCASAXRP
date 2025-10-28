'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWallet } from '@/context/WalletContext';

export default function TransactionsPage() {
  const { isConnected, address } = useWallet();
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'rent'>('all');

  const mockTransactions = [
    {
      id: '1',
      type: 'buy',
      property: 'Apartamento - Copacabana',
      tokens: 625,
      price: 0.8,
      total: 500,
      timestamp: new Date(Date.now() - 86400000),
      txHash: '0x1234...5678',
    },
    {
      id: '2',
      type: 'rent',
      property: 'Apartamento - Copacabana',
      tokens: 625,
      amount: 3.75,
      timestamp: new Date(Date.now() - 2592000000),
      txHash: '0xabcd...efgh',
    },
    {
      id: '3',
      type: 'buy',
      property: 'Casa - Praia do Futuro',
      tokens: 1333,
      price: 0.75,
      total: 1000,
      timestamp: new Date(Date.now() - 172800000),
      txHash: '0x9876...5432',
    },
  ];

  const filteredTransactions = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(t => t.type === filter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'bg-blue-100 text-blue-800';
      case 'sell': return 'bg-green-100 text-green-800';
      case 'rent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'buy': return 'Compra';
      case 'sell': return 'Venda';
      case 'rent': return 'Aluguel';
      default: return type;
    }
  };

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-600">
              Conecte sua carteira para ver o histórico de transações
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Histórico de Transações</h1>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Exportar CSV
            </button>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('buy')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'buy'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Compras
              </button>
              <button
                onClick={() => setFilter('sell')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'sell'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vendas
              </button>
              <button
                onClick={() => setFilter('rent')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'rent'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Aluguéis
              </button>
            </div>
          </div>

          {/* Lista de Transações */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Nenhuma transação encontrada</p>
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(tx.type)}`}>
                          {getTypeLabel(tx.type)}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{tx.property}</p>
                          <p className="text-sm text-gray-500">{tx.timestamp.toLocaleString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {tx.type === 'rent' ? (
                          <>
                            <p className="font-bold text-green-600">+R$ {tx.amount?.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Aluguel</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-gray-900">{tx.tokens} tokens</p>
                            <p className="text-sm text-gray-500">R$ {tx.total?.toLocaleString('pt-BR') || '0'}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400 font-mono">
                      {tx.txHash}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Total Investido</p>
              <p className="text-2xl font-bold text-gray-900">R$ 1.500</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Total Recebido</p>
              <p className="text-2xl font-bold text-green-600">R$ 165</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Transações</p>
              <p className="text-2xl font-bold text-primary-600">{mockTransactions.length}</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
