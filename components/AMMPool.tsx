'use client';

interface AMMPoolProps {
  propertyName: string;
}

export default function AMMPool({ propertyName }: AMMPoolProps) {
  const poolData = {
    totalLiquidity: 1250000,
    assetA: 1000000, // Tokens do imóvel
    assetB: 100000,  // XRP
    sharePrice: 0.80,
    tvl: 800000,
    volume24h: 150000,
    fee24h: 450, // 0.3% fee
  };

  const lpProviders = [
    { address: 'rAkp...9xK', share: 35, value: 280000 },
    { address: 'rBmx...3yK', share: 25, value: 200000 },
    { address: 'rCnv...2zK', share: 20, value: 160000 },
    { address: 'rDfg...1wK', share: 12, value: 96000 },
    { address: 'rEhn...0vK', share: 8, value: 64000 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">AMM Pool: {propertyName}</h3>

      {/* Resumo do Pool */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">TVL</div>
          <div className="text-xl font-bold text-primary-700">
            R$ {(poolData.tvl / 1000).toFixed(0)}k
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Volume 24h</div>
          <div className="text-xl font-bold text-blue-700">
            R$ {(poolData.volume24h / 1000).toFixed(0)}k
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Fee 24h</div>
          <div className="text-xl font-bold text-green-700">
            R$ {poolData.fee24h.toFixed(0)}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Share Price</div>
          <div className="text-xl font-bold text-purple-700">
            R$ {poolData.sharePrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Composição do Pool */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Composição do Pool</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="font-semibold text-gray-700">{propertyName} Tokens</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{poolData.assetA.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{(poolData.assetA / (poolData.assetA + poolData.assetB) * 100).toFixed(1)}%</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <span className="font-semibold text-gray-700">XRP</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{poolData.assetB.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{(poolData.assetB / (poolData.assetA + poolData.assetB) * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* LP Providers */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Liquidity Providers</h4>
        <div className="space-y-2">
          {lpProviders.map((provider, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{provider.address}</div>
                  <div className="text-sm text-gray-500">{provider.share}% do pool</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">R$ {provider.value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          💡 Este pool AMM garante liquidez 24/7. Qualquer ordem será executada instantaneamente com slippage mínimo.
        </p>
      </div>
    </div>
  );
}

