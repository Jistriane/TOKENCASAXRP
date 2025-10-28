'use client';

interface Document {
  id: string;
  type: 'matricula' | 'iptu' | 'contrato' | 'laudo' | 'outros';
  name: string;
  url: string;
  date: string;
  verified: boolean;
}

interface DocumentsViewerProps {
  documents: Document[];
}

export default function DocumentsViewer({ documents }: DocumentsViewerProps) {
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'matricula':
        return '📋';
      case 'iptu':
        return '🏛️';
      case 'contrato':
        return '📄';
      case 'laudo':
        return '✅';
      default:
        return '📎';
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      matricula: 'Matrícula',
      iptu: 'IPTU',
      contrato: 'Contrato de Locação',
      laudo: 'Laudo de Avaliação',
      outros: 'Outros Documentos',
    };
    return labels[type] || type;
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum documento disponível ainda.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{getDocumentIcon(doc.type)}</div>
              <div>
                <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">
                    {getDocumentTypeLabel(doc.type)}
                  </span>
                  {doc.verified && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      ✓ Verificado
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{doc.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg text-sm font-semibold transition-colors"
              >
                Visualizar
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">🔒 Segurança</p>
        <p>Documentos armazenados em IPFS com hash on-chain para garantia de autenticidade.</p>
      </div>
    </div>
  );
}
