import Navbar from './Navbar';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <Navbar />
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image src="/Logo.png" alt="TokenCasa Logo" width={120} height={120} className="rounded-2xl shadow-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 px-2">
            Invista em imóveis a partir de{' '}
            <span className="text-primary-600">R$ 100</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Da poupança para o patrimônio imobiliário em 5 minutos
          </p>
          <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Tokenize imóveis residenciais e comerciais no XRPL. 
            Receba aluguel proporcional automaticamente via smart contracts.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#marketplace"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explorar Imóveis
            </a>
            <a
              href="#portfolio"
              className="bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-primary-600 transition-all"
            >
              Ver Portfolio
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">9-14%</div>
              <div className="text-gray-600">Retorno Anual</div>
              <div className="text-sm text-gray-500 mt-1">vs. 7,3% poupança</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Liquidez Instantânea</div>
              <div className="text-sm text-gray-500 mt-1">Trading no DEX</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Transparente</div>
              <div className="text-sm text-gray-500 mt-1">On-chain verification</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

