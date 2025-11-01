'use client';

import { useWallet } from '@/context/WalletContext';
import { useState } from 'react';
import Notifications from './Notifications';
import Image from 'next/image';

export default function Navbar() {
  const { isConnected, address, balance, isConnecting, waitingForAuth, connect, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const shortenAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-between flex-1 md:flex-none">
            <div className="flex items-center space-x-3">
              <Image src="/Logo.png" alt="TokenCasa Logo" width={40} height={40} className="rounded-lg" />
              <h1 className="text-xl md:text-2xl font-bold text-primary-600">TokenCasa</h1>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 bg-white border-t border-gray-200 md:relative md:top-0 md:border-none md:flex md:space-x-6 flex-col md:flex-row w-full md:w-auto px-4 py-2 md:p-0 space-y-2 md:space-y-0`}>
            <a href="/" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Home</a>
            <a href="/#marketplace" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Marketplace</a>
            <a href="/#portfolio" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Portfolio</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Sobre</a>
            <a href="/trading" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Trading</a>
            <a href="/transactions" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Transações</a>
            <a href="/compliance" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-gray-100 md:hover:bg-transparent">Compliance</a>
          </nav>

          <div className="flex items-center space-x-4">
            {isConnected && <Notifications />}
            {waitingForAuth ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                <span className="text-yellow-600 font-semibold text-sm">
                  Aguardando autorização...
                </span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">{shortenAddress(address)}</span>
                  {balance && (
                    <span className="ml-2 text-primary-600 font-semibold">
                      {balance} XRP
                    </span>
                  )}
                </div>
                <button
                  onClick={disconnect}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Desconectar
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50"
              >
                {isConnecting ? 'Conectando...' : 'Conectar Carteira'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

