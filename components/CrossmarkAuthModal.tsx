'use client';

import React from 'react';

export default function CrossmarkAuthModal({
  open,
  onClose,
  onRetry,
}: {
  open: boolean;
  onClose: () => void;
  onRetry: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded max-w-md w-full shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Autorizar Crossmark</h3>
        <p className="mb-4 text-sm">
          Para conectar, abra a extensão Crossmark e autorize o acesso para localhost.
          Você pode clicar em &ldquo;Abrir Crossmark&rdquo; para forçar a abertura da extensão.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            Fechar
          </button>
          <button
            onClick={onRetry}
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Abrir Crossmark
          </button>
        </div>
      </div>
    </div>
  );
}