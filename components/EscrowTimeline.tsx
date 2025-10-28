'use client';

interface RentalPayment {
  id: string;
  propertyName: string;
  amount: number;
  tokensOwned: number;
  totalTokens: number;
  date: Date;
  status: 'pending' | 'received' | 'failed';
}

interface EscrowTimelineProps {
  payments: RentalPayment[];
}

export default function EscrowTimeline({ payments }: EscrowTimelineProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Ainda não há distribuições de aluguel registradas.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-600" />

      <div className="space-y-6">
        {payments.map((payment, index) => {
          const rentalPerToken = payment.amount / payment.totalTokens;
          const userRental = payment.tokensOwned * rentalPerToken;

          return (
            <div key={payment.id} className="relative pl-8">
              {/* Timeline Dot */}
              <div className="absolute left-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white transform -translate-x-2" />

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{payment.propertyName}</h4>
                    <p className="text-sm text-gray-500">
                      {payment.date.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payment.status === 'received' ? 'bg-green-100 text-green-700' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {payment.status === 'received' ? 'Recebido' :
                     payment.status === 'pending' ? 'Pendente' : 'Falhou'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 p-3 bg-primary-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Aluguel Total</p>
                    <p className="text-lg font-bold text-primary-600">
                      R$ {payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Você Recebeu</p>
                    <p className="text-lg font-bold text-green-600">
                      R$ {userRental.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-600">
                  <p>
                    Seus {payment.tokensOwned.toLocaleString()} tokens de {payment.totalTokens.toLocaleString()} totais 
                    = {((payment.tokensOwned / payment.totalTokens) * 100).toFixed(4)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
