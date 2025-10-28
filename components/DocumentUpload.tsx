'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Document {
  id: string;
  name: string;
  type: 'matricula' | 'iptu' | 'contrato' | 'laudo' | 'foto';
  file: File;
  ipfsHash?: string;
  verified: boolean;
  uploadedAt?: Date;
}

interface DocumentUploadProps {
  onDocumentsUploaded: (docs: Document[]) => void;
}

export default function DocumentUpload({ onDocumentsUploaded }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: Document['type']) => {
    const files = Array.from(e.target.files || []);
    
    const newDocs = files.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      type,
      file,
      verified: false,
    }));

    setDocuments([...documents, ...newDocs]);
  };

  const handleUpload = async () => {
    setIsUploading(true);

    // Simula upload para IPFS
    await new Promise(resolve => setTimeout(resolve, 2000));

    const uploadedDocs = documents.map(doc => ({
      ...doc,
      ipfsHash: `Qm${Math.random().toString(36).substring(7)}`,
      verified: true,
      uploadedAt: new Date(),
    }));

    setDocuments(uploadedDocs);
    setIsUploading(false);
    onDocumentsUploaded(uploadedDocs);

    alert('Documentos enviados para IPFS com sucesso!');
  };

  const handleRemove = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getDocumentTypeLabel = (type: Document['type']) => {
    const labels = {
      matricula: 'Matrícula do Imóvel',
      iptu: 'IPTU',
      contrato: 'Contrato de Locação',
      laudo: 'Laudo de Avaliação',
      foto: 'Fotos do Imóvel',
    };
    return labels[type];
  };

  const getDocumentTypeIcon = (type: Document['type']) => {
    if (type === 'foto') return '📷';
    return '📄';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload de Documentos</h3>

      {/* Tipos de Documentos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {(['matricula', 'iptu', 'contrato', 'laudo', 'foto'] as Document['type'][]).map((type) => (
          <div key={type} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary-400 transition-colors">
            <input
              type="file"
              id={`upload-${type}`}
              multiple={type === 'foto'}
              accept={type === 'foto' ? 'image/*' : '.pdf,.doc,.docx'}
              onChange={(e) => handleFileSelect(e, type)}
              className="hidden"
            />
            <label
              htmlFor={`upload-${type}`}
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-3xl mb-2">{getDocumentTypeIcon(type)}</span>
              <span className="text-sm font-semibold text-gray-700 text-center">
                {getDocumentTypeLabel(type)}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Lista de Documentos */}
      {documents.length > 0 && (
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-900">Documentos Selecionados ({documents.length})</h4>
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getDocumentTypeIcon(doc.type)}</span>
                <div>
                  <div className="font-semibold text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-500">{getDocumentTypeLabel(doc.type)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {doc.verified && (
                  <span className="text-green-600 text-sm">✓ Verificado</span>
                )}
                <button
                  onClick={() => handleRemove(doc.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão de Upload */}
      {documents.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isUploading ? 'Enviando para IPFS...' : `Enviar ${documents.length} documento(s) para IPFS`}
        </button>
      )}

      {/* Info */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          ℹ️ Documentos são armazenados no IPFS (InterPlanetary File System) garantindo segurança e descentralização.
          Apenas o hash IPFS é armazenado on-chain, mantendo privacidade.
        </p>
      </div>
    </div>
  );
}

