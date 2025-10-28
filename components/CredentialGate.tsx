'use client';

import { useWallet } from '@/context/WalletContext';
import KYCModal from './KYCModal';
import { useState } from 'react';

interface CredentialGateProps {
  children: React.ReactNode;
  showKYCIfNotCredential?: boolean;
  message?: string;
}

export default function CredentialGate({ 
  children, 
  showKYCIfNotCredential = false,
  message = 'Você precisa estar verificado para realizar esta ação.'
}: CredentialGateProps) {
  const { isConnected, hasCredential } = useWallet();
  const [showKYC, setShowKYC] = useState(false);

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800 font-semibold mb-2">
          Carteira não conectada
        </p>
        <p className="text-yellow-700 text-sm">
          Conecte sua carteira Crossmark para continuar.
        </p>
      </div>
    );
  }

  if (!hasCredential) {
    return (
      <>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Verificação Necessária (KYC)
              </h3>
              <p className="text-blue-800 mb-4">
                {message}
              </p>
              <p className="text-sm text-blue-700 mb-4">
                Para cumprir com os requisitos de compliance (KYC/AML), você precisa 
                verificar sua identidade antes de investir. Isso leva apenas alguns minutos.
              </p>
              {showKYCIfNotCredential && (
                <button
                  onClick={() => setShowKYC(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Verificar Identidade Agora
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              🔒 Por que preciso me verificar?
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Compliance com regulamentações brasileiras (CVM)</li>
              <li>• Proteção contra lavagem de dinheiro (AML)</li>
              <li>• Identidade verifica (KYC) para emissão de credential</li>
              <li>• Seus dados são criptografados e privados</li>
              <li>• Credencial emitida no XRPL sem expor CPF</li>
            </ul>
          </div>
        </div>

        {showKYC && (
          <KYCModal
            isOpen={showKYC}
            onClose={() => setShowKYC(false)}
            onComplete={(data) => {
              // Simula emissão de credential
              localStorage.setItem('credential_verified', 'true');
              setShowKYC(false);
              window.location.reload();
            }}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}
