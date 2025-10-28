'use client';

interface PerformanceData {
  month: string;
  invested: number;
  currentValue: number;
  yield: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.invested, d.currentValue)));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance do Portfolio</h3>
      
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => {
          const investedHeight = (item.invested / maxValue) * 100;
          const currentHeight = (item.currentValue / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              <div className="w-full flex flex-col items-center space-y-1 h-48">
                <div
                  className="w-full bg-primary-300 rounded-t transition-all hover:bg-primary-400"
                  style={{ height: `${currentHeight}%` }}
                  title={`Valor Atual: R$ ${item.currentValue.toLocaleString('pt-BR')}`}
                />
                <div
                  className="w-full bg-gray-300 rounded-t"
                  style={{ height: `${investedHeight}%` }}
                  title={`Investido: R$ ${item.invested.toLocaleString('pt-BR')}`}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-sm text-gray-600">Investido</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-300 rounded"></div>
          <span className="text-sm text-gray-600">Valor Atual</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Investido</p>
          <p className="text-xl font-bold text-gray-900">
            R$ {data.reduce((sum, d) => sum + d.invested, 0).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Valor Atual</p>
          <p className="text-xl font-bold text-green-600">
            R$ {data.reduce((sum, d) => sum + d.currentValue, 0).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Retorno</p>
          <p className="text-xl font-bold text-primary-600">
            {(((data.reduce((sum, d) => sum + d.currentValue, 0) / data.reduce((sum, d) => sum + d.invested, 0)) - 1) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

