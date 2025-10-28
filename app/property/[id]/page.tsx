'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const mockProperty = {
  id: '1',
  title: 'Apartamento - Copacabana',
  address: 'Av. Atlântica, 1000 - Copacabana, RJ',
  price: 800000,
  totalTokens: 1000000,
  pricePerToken: 0.8,
  yieldAnnual: 9,
  type: 'residencial',
  area: 85,
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=828',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=828',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=828',
  ],
  description: 'Apartamento moderno com vista para o mar, localizado no coração de Copacabana. Conta com 2 quartos, 1 banheiro, sala ampla e cozinha integrada. Excelente localização próxima a restaurantes, praia e transporte público.',
  features: [
    'Vista para o mar',
    '2 quartos',
    '1 banheiro',
    'Cozinha integrada',
    'Varanda',
    'Proximidade à praia',
  ],
  rentalHistory: [
    { month: 'Jan/2025', value: 6000, status: 'pago' },
    { month: 'Dez/2024', value: 6000, status: 'pago' },
    { month: 'Nov/2024', value: 6000, status: 'pago' },
  ],
};

export default function PropertyDetailsPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push('/')}
          className="text-primary-600 hover:text-primary-700 font-semibold mb-6"
        >
          ← Voltar ao Marketplace
        </button>

        {/* Galeria de Imagens */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <Image
              src={mockProperty.images[selectedImage]}
              alt={mockProperty.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{mockProperty.title}</h1>
              <p className="text-white">{mockProperty.address}</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {mockProperty.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-600' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-700 leading-relaxed">{mockProperty.description}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockProperty.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Histórico de Aluguéis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico de Aluguéis</h2>
              <div className="space-y-3">
                {mockProperty.rentalHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{item.month}</p>
                      <p className="text-sm text-gray-500">
                        {item.status === 'pago' ? '✅ Pago' : '⏳ Pendente'}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-green-600">R$ {item.value.toLocaleString('pt-BR')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa (placeholder) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Localização</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Mapa interativo - em desenvolvimento</p>
              </div>
            </div>
          </div>

          {/* Sidebar de Investimento */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investir Agora</h2>

              {/* Informações do Imóvel */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor Total:</span>
                  <span className="font-bold text-gray-900">R$ {mockProperty.price.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tokens:</span>
                  <span className="font-bold text-gray-900">{mockProperty.totalTokens.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço/Token:</span>
                  <span className="font-bold text-gray-900">R$ {mockProperty.pricePerToken.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yield Anual:</span>
                  <span className="font-bold text-green-600">{mockProperty.yieldAnnual}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Área:</span>
                  <span className="font-bold text-gray-900">{mockProperty.area}m²</span>
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              {/* Input de Investimento */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor do Investimento (mínimo R$ 100)
                </label>
                <input
                  type="number"
                  min="100"
                  step="1"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Digite o valor"
                />
              </div>

              {/* Cálculo */}
              {investmentAmount && parseFloat(investmentAmount) >= 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Você receberá:</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {Math.floor(parseFloat(investmentAmount) / mockProperty.pricePerToken)} tokens
                  </div>
                  <div className="text-sm text-gray-600">
                    {(
                      (Math.floor(parseFloat(investmentAmount) / mockProperty.pricePerToken) /
                        mockProperty.totalTokens) *
                      100
                    ).toFixed(4)}% do imóvel
                  </div>
                </div>
              )}

              {/* Botão de Investir */}
              <button
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold py-4 rounded-lg transition-colors"
                disabled={!investmentAmount || parseFloat(investmentAmount) < 100}
              >
                Investir Agora
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Liquididade 24/7 • Sem taxas • Transparente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

