'use client';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'rent' | 'transfer';
  property: string;
  propertyId: string;
  tokens: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p className="text-gray-600 text-lg">Nenhuma transação ainda</p>
        <p className="text-gray-500 text-sm mt-2">Suas transações aparecerão aqui</p>
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return '🟢';
      case 'sell':
        return '🔴';
      case 'rent':
        return '💰';
      case 'transfer':
        return '🔄';
      default:
        return '📄';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Concluída</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pendente</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Falhou</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Imóvel
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tokens
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{transaction.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{transaction.property}</div>
                  {transaction.txHash && (
                    <a
                      href={`https://xrpl.org/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Ver na blockchain →
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.tokens.toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  R$ {transaction.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.timestamp.toLocaleDateString('pt-BR')}
                  <div className="text-xs text-gray-500">
                    {transaction.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total de transações:</span>
          <span className="font-semibold text-gray-900">{transactions.length}</span>
        </div>
      </div>
    </div>
  );
}
