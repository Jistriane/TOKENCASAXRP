'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    pricePerToken: number;
  };
  userTokens: number;
  onSell: (tokens: number, price: number) => void;
}

export default function TradingModal({ isOpen, onClose, property, userTokens, onSell }: TradingModalProps) {
  const { isConnected } = useWallet();
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState(property.pricePerToken.toFixed(2));
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');

  if (!isOpen) return null;

  const handleSell = () => {
    if (!isConnected) {
      alert('Por favor, conecte sua carteira para vender tokens.');
      return;
    }

    const tokens = parseInt(sellAmount);
    const price = parseFloat(sellPrice);

    if (tokens > userTokens) {
      alert('Você não tem tokens suficientes.');
      return;
    }

    if (tokens < 1) {
      alert('Quantidade mínima é 1 token.');
      return;
    }

    onSell(tokens, price);
    setSellAmount('');
    setSellPrice(property.pricePerToken.toFixed(2));
  };

  const totalValue = sellAmount ? (parseInt(sellAmount) * parseFloat(sellPrice)).toFixed(2) : '0.00';
  const percentageOwned = ((parseInt(sellAmount) || 0) / property.pricePerToken).toFixed(4);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Vender Tokens</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações do Imóvel */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Imóvel</p>
            <p className="font-semibold text-gray-900">{property.title}</p>
            <p className="text-sm text-gray-600 mt-2">
              Você possui: <span className="font-semibold text-primary-600">{userTokens.toLocaleString()} tokens</span>
            </p>
          </div>

          {/* Tipo de Ordem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Ordem
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setOrderType('market');
                  setSellPrice(property.pricePerToken.toFixed(2));
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  orderType === 'market'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Market (Preço Atual)
              </button>
              <button
                onClick={() => setOrderType('limit')}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  orderType === 'limit'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Limit (Preço Personalizado)
              </button>
            </div>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantidade de Tokens *
            </label>
            <input
              type="number"
              min="1"
              max={userTokens}
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Digite a quantidade"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Disponível: {userTokens.toLocaleString()}</span>
              <button
                onClick={() => setSellAmount(userTokens.toString())}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Vender tudo
              </button>
            </div>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preço por Token (R$) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              disabled={orderType === 'market'}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                orderType === 'market' ? 'bg-gray-100' : ''
              }`}
              placeholder="Digite o preço"
            />
            <p className="mt-2 text-sm text-gray-600">
              Preço atual: R$ {property.pricePerToken.toFixed(2)}
            </p>
          </div>

          {/* Resumo */}
          {sellAmount && parseInt(sellAmount) > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Você receberá:</p>
              <div className="text-2xl font-bold text-green-600 mb-2">
                R$ {totalValue}
              </div>
              <div className="text-sm text-gray-600">
                {parseInt(sellAmount).toLocaleString()} tokens × R$ {parseFloat(sellPrice).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                ⚠️ Taxa da rede XRPL: ~R$ 0,002 (negligível)
              </div>
            </div>
          )}

          {/* Informações Importantes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Informações Importantes</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• A ordem será executada no DEX nativo do XRPL</li>
              <li>• Trading 24/7 com liquidez instantânea via AMM</li>
              <li>• Liquidação em ~3-5 segundos</li>
              <li>• Taxa de rede: apenas ~R$ 0,002</li>
            </ul>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSell}
              disabled={!sellAmount || parseInt(sellAmount) < 1 || parseFloat(sellPrice) <= 0}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
            >
              {orderType === 'market' ? 'Vender no Preço Atual' : 'Criar Ordem Limit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

