'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useWallet } from '@/context/WalletContext';
import MarketplaceFilters from './MarketplaceFilters';
import CredentialGate from './CredentialGate';

export interface PropertyFilters {
  type: 'todos' | 'residencial' | 'comercial';
  minYield: number;
  maxYield: number;
  minPrice: number;
  maxPrice: number;
  location: string;
}

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  totalTokens: number;
  pricePerToken: number;
  yieldAnnual: number;
  type: 'residencial' | 'comercial';
  image: string;
  area: number;
  description: string;
}

// Dados mock de imóveis
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento - Copacabana',
    address: 'Av. Atlântica, 1000 - Copacabana, RJ',
    price: 800000,
    totalTokens: 1000000,
    pricePerToken: 0.8,
    yieldAnnual: 9,
    type: 'residencial',
    area: 85,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=828',
    description: 'Apartamento moderno com vista para o mar, localizado no coração de Copacabana.',
  },
  {
    id: '2',
    title: 'Loja Comercial - Vila Madalena',
    address: 'Rua Harmonia, 500 - Vila Madalena, SP',
    price: 1200000,
    totalTokens: 1000000,
    pricePerToken: 1.2,
    yieldAnnual: 8.5,
    type: 'comercial',
    area: 120,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=828',
    description: 'Loja bem localizada em área de alto movimento, próximo ao metrô.',
  },
  {
    id: '3',
    title: 'Casa - Praia do Futuro',
    address: 'Av. Beira Mar, 2500 - Fortaleza, CE',
    price: 600000,
    totalTokens: 800000,
    pricePerToken: 0.75,
    yieldAnnual: 10,
    type: 'residencial',
    area: 150,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=828',
    description: 'Casa de praia com piscina e área gourmet, excelente para locação.',
  },
  {
    id: '4',
    title: 'Galpão Industrial - São Bernardo',
    address: 'Rua Industrial, 1500 - São Bernardo, SP',
    price: 2500000,
    totalTokens: 1000000,
    pricePerToken: 2.5,
    yieldAnnual: 7.5,
    type: 'comercial',
    area: 800,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=828',
    description: 'Galpão estruturado em área industrial consolidada, com alto potencial de locação.',
  },
];

export default function Marketplace() {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const { isConnected, address } = useWallet();

  const handleFilterChange = (filters: PropertyFilters) => {
    const filtered = mockProperties.filter(property => {
      // Filtrar por tipo
      if (filters.type !== 'todos' && property.type !== filters.type) {
        return false;
      }

      // Filtrar por yield
      if (property.yieldAnnual < filters.minYield || property.yieldAnnual > filters.maxYield) {
        return false;
      }

      // Filtrar por preço
      if (property.pricePerToken < filters.minPrice || property.pricePerToken > filters.maxPrice) {
        return false;
      }

      // Filtrar por localização
      if (filters.location && !property.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const handleInvest = async (property: Property) => {
    if (!isConnected) {
      alert('Por favor, conecte sua carteira para investir.');
      return;
    }

    // Verifica se tem credential (KYC)
    // TODO: Implementar verificação real de credential
    const hasCredential = true; // Simulado por enquanto

    if (!hasCredential) {
      alert('Você precisa completar a verificação KYC antes de investir.');
      return;
    }

    if (!investmentAmount || parseFloat(investmentAmount) < 100) {
      alert('Investimento mínimo é R$ 100');
      return;
    }

    const tokens = Math.floor(parseFloat(investmentAmount) / property.pricePerToken);
    
    try {
      // Simula transação blockchain
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`✅ Investimento de R$ ${investmentAmount} (${tokens} tokens) executado com sucesso no DEX!`);
      setSelectedProperty(null);
      setInvestmentAmount('');
    } catch (error) {
      alert('❌ Erro ao executar investimento. Tente novamente.');
    }
  };

  return (
    <section id="marketplace" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Marketplace de Imóveis
          </h2>
          <p className="text-xl text-gray-600">
            Escolha seus imóveis e comece a investir agora
          </p>
        </div>

        <MarketplaceFilters onFilterChange={handleFilterChange} />

        <div className="text-sm text-gray-600 mb-4">
          Encontrados: {filteredProperties.length} imóveis
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProperties.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button
                onClick={() => handleFilterChange({ type: 'todos', minYield: 0, maxYield: 15, minPrice: 0, maxPrice: 1000, location: '' })}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedProperty(property)}
            >
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.type === 'residencial'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {property.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{property.address}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      {property.yieldAnnual}%
                    </div>
                    <div className="text-sm text-gray-500">Yield Anual</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      R$ {property.pricePerToken.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Por token</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>Área: {property.area}m²</span>
                  <span>Total: {property.totalTokens.toLocaleString()} tokens</span>
                </div>

                <button
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  onClick={() => setSelectedProperty(property)}
                >
                  Ver Detalhes e Investir
                </button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Investimento */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProperty.title}
              </h2>
              <p className="text-gray-600 mb-6">{selectedProperty.address}</p>
              <p className="text-gray-700 mb-6">{selectedProperty.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Investimento Total</div>
                  <div className="text-2xl font-bold text-primary-600">
                    R$ {selectedProperty.price.toLocaleString()}
                  </div>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Yield Anual</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {selectedProperty.yieldAnnual}%
                  </div>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Preço por Token</div>
                  <div className="text-2xl font-bold text-primary-600">
                    R$ {selectedProperty.pricePerToken.toFixed(2)}
                  </div>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Área</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {selectedProperty.area}m²
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor do Investimento (mínimo R$ 100)
                </label>
                <input
                  type="number"
                  min="100"
                  step="1"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Digite o valor"
                />

                {investmentAmount && parseFloat(investmentAmount) >= 100 && (
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="text-sm text-gray-600">Você receberá:</div>
                    <div className="text-2xl font-bold text-green-600">
                      {Math.floor(parseFloat(investmentAmount) / selectedProperty.pricePerToken)} tokens
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {(
                        (Math.floor(parseFloat(investmentAmount) / selectedProperty.pricePerToken) /
                          selectedProperty.totalTokens) *
                        100
                      ).toFixed(4)}% do imóvel
                    </div>
                  </div>
                )}

                <CredentialGate showKYCIfNotCredential>
                  <button
                    onClick={() => handleInvest(selectedProperty)}
                    disabled={!investmentAmount || parseFloat(investmentAmount) < 100}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
                  >
                    Investir Agora
                  </button>
                </CredentialGate>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

