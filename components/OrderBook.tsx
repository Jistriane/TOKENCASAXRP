'use client';

interface Order {
  id: string;
  price: number;
  amount: number;
  type: 'bid' | 'ask';
}

export default function OrderBook() {
  // Dados mock do order book
  const bids: Order[] = [
    { id: '1', price: 0.85, amount: 5000, type: 'bid' },
    { id: '2', price: 0.84, amount: 3000, type: 'bid' },
    { id: '3', price: 0.83, amount: 8000, type: 'bid' },
    { id: '4', price: 0.82, amount: 2000, type: 'bid' },
    { id: '5', price: 0.81, amount: 1500, type: 'bid' },
  ];

  const asks: Order[] = [
    { id: '6', price: 0.86, amount: 4000, type: 'ask' },
    { id: '7', price: 0.87, amount: 6000, type: 'ask' },
    { id: '8', price: 0.88, amount: 3000, type: 'ask' },
    { id: '9', price: 0.89, amount: 5000, type: 'ask' },
    { id: '10', price: 0.90, amount: 2000, type: 'ask' },
  ];

  const spread = asks[0]?.price - bids[0]?.price || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Book</h3>
      
      {/* Spread */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Spread</span>
          <span className="font-semibold text-gray-900">
            R$ {spread.toFixed(4)}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Melhor bid: R$ {bids[0]?.price.toFixed(2)} | Melhor ask: R$ {asks[0]?.price.toFixed(2)}
        </div>
      </div>

      {/* Grid de Order Book */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bids (Buy Orders) */}
        <div>
          <h4 className="text-sm font-semibold text-green-700 mb-2">Bids (Compra)</h4>
          <div className="space-y-1">
            {bids.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-2 bg-green-50 rounded text-sm"
              >
                <div className="flex-1 text-right">
                  <div className="font-semibold text-green-700">R$ {order.price.toFixed(2)}</div>
                </div>
                <div className="text-gray-600 w-20 text-right">{order.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Asks (Sell Orders) */}
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-2">Asks (Venda)</h4>
          <div className="space-y-1">
            {asks.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-2 bg-red-50 rounded text-sm"
              >
                <div className="flex-1 text-left">
                  <div className="font-semibold text-red-700">R$ {order.price.toFixed(2)}</div>
                </div>
                <div className="text-gray-600 w-20 text-left">{order.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Ordem mais próxima: R$ {((bids[0].price + asks[0].price) / 2).toFixed(2)}
      </div>
    </div>
  );
}

