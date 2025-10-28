'use client';

import { useState, useEffect } from 'react';

export default function MockWalletToggle() {
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    const mockLocalStorage = localStorage.getItem('wallet_mock_mode');
    const mockParam = new URLSearchParams(window.location.search).get('mock');
    const isActive = mockLocalStorage === 'true' || mockParam === 'true';
    setIsMockMode(isActive);
  }, []);

  const toggleMock = () => {
    if (isMockMode) {
      localStorage.removeItem('wallet_mock_mode');
      (window as any).walletMockMode = false;
      setIsMockMode(false);
      console.log('🎭 Modo MOCK desativado');
      window.location.reload();
    } else {
      localStorage.setItem('wallet_mock_mode', 'true');
      (window as any).walletMockMode = true;
      setIsMockMode(true);
      console.log('🎭 Modo MOCK ativado');
      window.location.reload();
    }
  };

  if (!isMockMode) {
    return (
      <button
        onClick={toggleMock}
        className="fixed bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold text-sm shadow-lg z-50"
        title="Ativar carteira MOCK para testes"
      >
        🎭 Ativar MOCK
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">🎭 Modo MOCK Ativo</span>
        <button
          onClick={toggleMock}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
        >
          Desativar
        </button>
      </div>
      <p className="text-xs mt-1 opacity-90">
        Usando carteira simulada. Todas as transações são fictícias.
      </p>
    </div>
  );
}

