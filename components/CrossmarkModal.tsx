'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Step {
  title: string;
  description: string;
  icon: string;
  done?: boolean;
}

export default function CrossmarkAuthModal({
  open,
  onClose,
  onRetry,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onRetry: () => void | Promise<void>;
  isLoading?: boolean;
}) {
  const [showHelp, setShowHelp] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: 'Instalar Crossmark',
      description: 'Se ainda não tiver o Crossmark, instale a extensão em crossmark.io',
      icon: '🔧',
    },
    {
      title: 'Abrir Extensão',
      description: 'Clique no botão abaixo para abrir a extensão Crossmark',
      icon: '🔍',
    },
    {
      title: 'Autorizar',
      description: 'Na extensão, clique em "Autorizar" para permitir o acesso',
      icon: '✅',
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-md shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h3 className="text-lg sm:text-xl font-semibold">Conectar Carteira</h3>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Ajuda"
          >
            {showHelp ? '❌' : '❓'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showHelp ? (
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-lg">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                {/* Placeholder for Crossmark logo/icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  💰
                </div>
              </div>
              <p className="text-center mb-6">
                Para conectar sua carteira XRPL, autorize o acesso na extensão Crossmark.
              </p>
            </>
          )}

          {/* Progress or Error State */}
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 mb-4">
              <div className="animate-spin text-lg">⭕</div>
              <span>Aguardando autorização...</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50 text-sm font-medium"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⭕</span>
                Aguarde...
              </>
            ) : (
              <>
                <span>🔗</span>
                Abrir Crossmark
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}