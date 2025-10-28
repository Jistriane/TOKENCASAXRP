export default function Stats() {
  const stats = [
    { value: 'R$ 10T+', label: 'Mercado Tokenizado' },
    { value: '77M', label: 'Pessoas Impactadas' },
    { value: '300%', label: 'Crescimento 2024' },
    { value: 'R$ 100', label: 'Investimento Mínimo' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

