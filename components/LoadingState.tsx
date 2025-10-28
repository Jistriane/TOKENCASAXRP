'use client';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingState({ message = 'Carregando...', size = 'md' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4`} />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
}

// Skeleton Loaders
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-8 bg-gray-300 rounded" />
          <div className="h-8 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-16 bg-gray-300 rounded" />
            <div className="h-16 bg-gray-300 rounded" />
            <div className="h-16 bg-gray-300 rounded" />
            <div className="h-16 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-6" />
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}
