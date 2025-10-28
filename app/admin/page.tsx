'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { isConnected, address } = useWallet();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    propertyType: 'residencial',
    area: '',
    totalPrice: '',
    totalTokens: '',
    yieldAnnual: '',
    description: '',
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conecte sua Carteira</h2>
          <p className="text-gray-600 mb-6">
            Você precisa conectar sua carteira para acessar o painel admin.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Conectar Carteira
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simula tokenização
    console.log('Tokenizando imóvel:', formData);
    
    alert('Imóvel tokenizado com sucesso! O MPT será criado no XRPL em breve.');
    
    // Reset form
    setFormData({
      title: '',
      address: '',
      propertyType: 'residencial',
      area: '',
      totalPrice: '',
      totalTokens: '',
      yieldAnnual: '',
      description: '',
    });
  };

  const pricePerToken = formData.totalPrice && formData.totalTokens 
    ? (parseFloat(formData.totalPrice) / parseFloat(formData.totalTokens)).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Painel Admin - Tokenização
          </h1>
          <p className="text-gray-600">
            Crie um novo imóvel tokenizado para o marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título do Imóvel *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Apartamento - Copacabana"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Endereço Completo *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ex: Av. Atlântica, 1000 - Copacabana, RJ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tipo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Imóvel *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Área (m²) *
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Ex: 85"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Preço Total */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valor Total do Imóvel (R$) *
              </label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                placeholder="Ex: 800000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Total de Tokens */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total de Tokens *
              </label>
              <input
                type="number"
                name="totalTokens"
                value={formData.totalTokens}
                onChange={handleChange}
                placeholder="Ex: 1000000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Preço por Token (calculado) */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-primary-700 mb-2">
              Preço por Token (calculado)
            </label>
            <div className="text-2xl font-bold text-primary-600">
              R$ {pricePerToken}
            </div>
          </div>

          {/* Yield Anual */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yield Anual (%) *
            </label>
            <input
              type="number"
              name="yieldAnnual"
              value={formData.yieldAnnual}
              onChange={handleChange}
              placeholder="Ex: 9"
              step="0.1"
              min="0"
              max="20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva o imóvel, características, localização, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Upload de Fotos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload de Fotos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photos-upload"
              />
              <label
                htmlFor="photos-upload"
                className="cursor-pointer"
              >
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">Clique para fazer upload de fotos</p>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG até 10MB cada</p>
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
            >
              Tokenizar Imóvel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

