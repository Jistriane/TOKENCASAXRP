'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Compliance & Regulamentação</h1>

          {/* KYC/AML */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 KYC/AML</h2>
            <p className="text-gray-700 mb-4">
              A TokenCasa implementa rigorosos protocolos de Know Your Customer (KYC) e 
              Anti-Money Laundering (AML) para garantir a segurança e conformidade de todas as operações.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Verificação de identidade em 2 etapas</li>
              <li>Upload de documentos oficiais (RG, CPF, CNH)</li>
              <li>Validação de endereço residencial</li>
              <li>Credencial &quot;BR-Investor-Verified&quot; emitida no XRPL</li>
              <li>Privacy-preserving: CPF não exposto on-chain</li>
            </ul>
          </section>

          {/* Regulamentação CVM */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Regulamentação CVM</h2>
            <p className="text-gray-700 mb-4">
              A TokenCasa opera em conformidade com a Comissão de Valores Mobiliários (CVM) 
              do Brasil. Todas as transações são reportadas automaticamente para fins de 
              auditoria e transparência.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Aviso:</strong> Os investimentos em imóveis tokenizados podem variar 
                conforme as condições de mercado. Nenhum investimento está isento de risco. 
                Consulte sempre um profissional financeiro antes de investir.
              </p>
            </div>
          </section>

          {/* Privacidade */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Política de Privacidade</h2>
            <p className="text-gray-700 mb-4">
              Sua privacidade é fundamental para nós. A TokenCasa coleta apenas informações 
              necessárias para compliance e não compartilha seus dados com terceiros sem 
              seu consentimento explícito.
            </p>
            <div className="space-y-3 text-gray-700">
              <p><strong>Dados Coletados:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Informações pessoais para KYC (nome, CPF, endereço)</li>
                <li>Documentos de identidade (criptografados)</li>
                <li>Endereço da carteira XRPL</li>
                <li>Histórico de transações on-chain</li>
              </ul>
              <p className="mt-4"><strong>Como Protegemos:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Criptografia end-to-end de dados sensíveis</li>
                <li>Armazenamento seguro em bancos de dados protegidos</li>
                <li>Credentials portáteis (você controla sua identidade)</li>
                <li>Dados on-chain verificáveis mas privados</li>
              </ul>
            </div>
          </section>

          {/* Termos de Uso */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Termos de Uso</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 mb-4"><strong>1. Elegibilidade</strong></p>
              <p className="text-gray-600 mb-4">
                Para usar a TokenCasa, você deve ter 18 anos ou mais e completar o processo 
                de verificação KYC. Apenas investidores verificados podem comprar ou vender tokens.
              </p>

              <p className="text-gray-700 mb-4"><strong>2. Responsabilidades</strong></p>
              <p className="text-gray-600 mb-4">
                Você é responsável por manter a segurança de sua carteira e credenciais. 
                A TokenCasa não pode recuperar carteiras perdidas.
              </p>

              <p className="text-gray-700 mb-4"><strong>3. Riscos</strong></p>
              <p className="text-gray-600 mb-4">
                Investimentos em imóveis tokenizados são sujeitos a riscos de mercado, 
                flutuação de preços e iliquidez potencial. Nenhum rendimento é garantido.
              </p>

              <p className="text-gray-700 mb-4"><strong>4. Taxas</strong></p>
              <p className="text-gray-600 mb-4">
                A TokenCasa cobra taxa de 2% na tokenização e 0,3% em transações de trading. 
                A rede XRPL cobra ~R$ 0,002 por transação.
              </p>
            </div>
          </section>

          {/* Contato */}
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">📧 Contato</h2>
            <p className="mb-4">
              Dúvidas sobre compliance, regulamentação ou segurança?
            </p>
            <div className="space-y-2">
              <p>📧 Email: compliance@tokencasa.com</p>
              <p>📞 Telefone: (11) 3000-0000</p>
              <p>🏢 Endereço: São Paulo, SP - Brasil</p>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
