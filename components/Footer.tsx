export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">TokenCasa</h3>
            <p className="text-gray-400">
              Invista em imóveis a partir de R$ 100
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/#marketplace" className="hover:text-white">Marketplace</a></li>
              <li><a href="/#portfolio" className="hover:text-white">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white">Sobre</a></li>
              <li><a href="/trading" className="hover:text-white">Trading</a></li>
              <li><a href="/transactions" className="hover:text-white">Transações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/compliance" className="hover:text-white">Compliance</a></li>
              <li><a href="/compliance" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="/compliance" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="/compliance" className="hover:text-white">KYC/AML</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Contato</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Documentação</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TokenCasa. Todos os direitos reservados.</p>
          <p className="mt-2">Powered by XRPL</p>
        </div>
      </div>
    </footer>
  );
}

