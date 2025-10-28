'use client';

import { useState } from 'react';
import { PropertyFilters } from './Marketplace';

interface Filters {
  type: 'todos' | 'residencial' | 'comercial';
  minYield: number;
  maxYield: number;
  minPrice: number;
  maxPrice: number;
  location: string;
}

interface MarketplaceFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export default function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    type: 'todos',
    minYield: 0,
    maxYield: 15,
    minPrice: 0,
    maxPrice: 1000,
    location: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (name: keyof Filters, value: string | number) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: Filters = {
      type: 'todos',
      minYield: 0,
      maxYield: 15,
      minPrice: 0,
      maxPrice: 1000,
      location: '',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Filtros</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700"
        >
          <svg 
            className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Tipo de Imóvel */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Imóvel
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleChange('type', 'todos')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filters.type === 'todos'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => handleChange('type', 'residencial')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filters.type === 'residencial'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Residencial
              </button>
              <button
                onClick={() => handleChange('type', 'comercial')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filters.type === 'comercial'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Comercial
              </button>
            </div>
          </div>

          {/* Yield Anual */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yield Anual (%)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={filters.minYield}
                  onChange={(e) => handleChange('minYield', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={filters.maxYield}
                  onChange={(e) => handleChange('maxYield', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Preço por Token */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preço por Token (R$)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => handleChange('minPrice', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => handleChange('maxPrice', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Localização
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={resetFilters}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

