'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import OrderBook from '@/components/OrderBook';
import AMMPool from '@/components/AMMPool';
import SlippageCalculator from '@/components/SlippageCalculator';
import TradingModal from '@/components/TradingModal';

export default function TradingPage() {
  const { isConnected } = useWallet();
  const [selectedProperty, setSelectedProperty] = useState({
    id: '1',
    title: 'Apartamento - Copacabana',
    pricePerToken: 0.80,
  });

  const [showTradingModal, setShowTradingModal] = useState(false);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conecte sua Carteira</h2>
          <p className="text-gray-600 mb-6">
            Você precisa conectar sua carteira para acessar o trading.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Ir para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trading DEX</h1>
          <p className="text-xl text-gray-600">
            Compre e venda tokens de imóveis com liquidez 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Book e Trading */}
          <div className="lg:col-span-2 space-y-8">
            <OrderBook />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SlippageCalculator
                currentPrice={selectedProperty.pricePerToken}
                onSlippageCalculated={(slippage, price) => {
                  console.log('Slippage:', slippage, 'Price:', price);
                }}
              />
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowTradingModal(true)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Abrir Posição de Compra
                  </button>
                  <button
                    onClick={() => setShowTradingModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Abrir Posição de Venda
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: AMM Pool */}
          <div className="lg:col-span-1">
            <AMMPool propertyName={selectedProperty.title} />
          </div>
        </div>

        {/* Info sobre DEX */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">✨ Trading no XRPL DEX</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-lg mb-1">⚡ Instantâneo</div>
              <div className="text-primary-100">3-5 segundos para execução</div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1">💰 Baixas Taxas</div>
              <div className="text-primary-100">~R$ 0,002 por transação</div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1">🌊 Liquidez</div>
              <div className="text-primary-100">AMM garante sempre disponível</div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1">📊 Transparente</div>
              <div className="text-primary-100">Tudo on-chain verificável</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Modal */}
      {showTradingModal && (
        <TradingModal
          isOpen={showTradingModal}
          onClose={() => setShowTradingModal(false)}
          property={selectedProperty}
          userTokens={1000}
          onSell={(tokens, price) => {
            console.log('Sell:', tokens, price);
            setShowTradingModal(false);
          }}
        />
      )}
    </div>
  );
}

