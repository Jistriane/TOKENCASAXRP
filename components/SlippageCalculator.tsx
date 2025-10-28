'use client';

import { useState } from 'react';

interface SlippageCalculatorProps {
  currentPrice: number;
  onSlippageCalculated: (slippage: number, estimatedPrice: number) => void;
}

export default function SlippageCalculator({ currentPrice, onSlippageCalculated }: SlippageCalculatorProps) {
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');

  const calculateSlippage = () => {
    if (!amount) return;

    const amountNum = parseFloat(amount);
    
    // Slippage simulation baseado no tamanho da ordem
    // Ordem grande = maior slippage
    const slippagePercent = Math.min(0.5, amountNum / 10000); // Max 0.5%
    const slippageAmount = currentPrice * slippagePercent / 100;
    
    let estimatedPrice: number;
    if (orderType === 'buy') {
      // Comprar puxa o preço para cima
      estimatedPrice = currentPrice + slippageAmount;
    } else {
      // Vender puxa o preço para baixo
      estimatedPrice = currentPrice - slippageAmount;
    }

    onSlippageCalculated(slippagePercent * 100, estimatedPrice);
  };

  const slippage = amount ? Math.min(0.5, parseFloat(amount) / 10000) * 100 : 0;
  const estimatedPrice = orderType === 'buy'
    ? currentPrice + (currentPrice * slippage / 100)
    : currentPrice - (currentPrice * slippage / 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Calculadora de Slippage</h3>

      <div className="space-y-4">
        {/* Tipo de Ordem */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Ordem
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setOrderType('buy')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                orderType === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Comprar
            </button>
            <button
              onClick={() => setOrderType('sell')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                orderType === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Vender
            </button>
          </div>
        </div>

        {/* Quantidade */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantidade de Tokens
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Digite a quantidade"
          />
        </div>

        {/* Resultados */}
        {amount && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Preço Atual:</span>
              <span className="font-semibold">R$ {currentPrice.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Slippage Estimado:</span>
              <span className="font-semibold text-orange-600">{slippage.toFixed(4)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Preço Estimado:</span>
              <span className="font-semibold text-gray-900">
                R$ {estimatedPrice.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-primary-200">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="font-bold text-primary-600">
                R$ {(estimatedPrice * parseFloat(amount)).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            ℹ️ O slippage depende da liquidez da ordem. Ordens grandes em ativos ilíquidos podem ter maior slippage.
          </p>
        </div>
      </div>
    </div>
  );
}

