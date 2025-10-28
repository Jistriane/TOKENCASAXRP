'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sobre a <span className="text-primary-600">TokenCasa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Democratizando o acesso ao mercado imobiliário através da tokenização no XRPL
            </p>
          </div>

          {/* Missão */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Nossa Missão</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              A TokenCasa foi criada para resolver um dos maiores problemas financeiros do Brasil:
              a inacessibilidade ao mercado imobiliário para 80% da população.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Com investimento mínimo de R$ 100, qualquer pessoa pode agora se tornar dono de imóveis
              reais, recebendo aluguel proporcional automaticamente e com liquidez 24/7.
            </p>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inovação</h3>
              <p className="text-gray-600">
                Primeira plataforma de tokenização imobiliária usando todas as features nativas do XRPL
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Democratização</h3>
              <p className="text-gray-600">
                Quebra barreiras financeiras e permite investimento em imóveis a partir de R$ 100
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparência</h3>
              <p className="text-gray-600">
                Tudo on-chain verificável. Você tem controle total sobre seus investimentos
              </p>
            </div>
          </div>

          {/* Tecnologia */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6">💻 Tecnologia XRPL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Features Utilizadas:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Multi-Purpose Tokens (MPT)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> DEX Nativo
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> AMM (Automated Market Maker)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Escrow Nativo
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Credentials (XLS-70)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> DID (Decentralized Identifiers)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Hooks (Lógica customizada)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Vantagens do XRPL:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">⚡</span> 3-5 segundos de confirmação
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">💰</span> Custos de R$ 0,002 (100x mais barato)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🔐</span> Compliance nativo integrado
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌊</span> Liquidez 24/7 via DEX
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🎯</span> CAM exclusivo (único no mercado)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">♻️</span> Escrow automático para aluguel
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌍</span> Protocolo enterprise-grade
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impacto Social */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Impacto Social</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">77M</div>
                <div className="text-gray-600">Pessoas Impactadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">R$ 10T</div>
                <div className="text-gray-600">Mercado Endereçável</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">300%</div>
                <div className="text-gray-600">Crescimento 2024</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">R$ 100</div>
                <div className="text-gray-600">Investimento Mínimo</div>
              </div>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">👥 Casos de Uso Reais</h2>
            <div className="space-y-6">
              {/* Caso 1: Pedro */}
              <div className="border-l-4 border-primary-600 pl-6 py-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Caso 1: Pedro (32 anos, Comerciante - Classe C)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Antes:</p>
                    <p className="text-gray-700">R$ 5.000 parados na poupança (7,3% a.a. = R$ 365/ano)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Depois:</p>
                    <p className="text-gray-700 font-semibold">R$ 5.000 em 50 imóveis tokenizados (9-10% a.a. = R$ 450-500/ano)</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Ganho:</strong> +23-37% rendimento, diversificação real, liquidez 24/7, 
                  recebe R$ 37-42/mês de aluguel automaticamente. Começou a construir patrimônio imobiliário.
                </p>
              </div>

              {/* Caso 2: Julia */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Caso 2: Julia (24 anos, Designer Freelancer)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Antes:</p>
                    <p className="text-gray-700">R$ 500 disponíveis (muito pouco para FII ou imóvel tradicional)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Depois:</p>
                    <p className="text-gray-700 font-semibold">R$ 500 em 5 imóveis diferentes (R$ 100 cada)</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Resultado:</strong> Portfolio diversificado, recebe R$ 3-4/mês de aluguel, 
                  aprende sobre investimentos. Primeiro passo em educação financeira, sente-se proprietária.
                </p>
              </div>

              {/* Caso 3: Roberto */}
              <div className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Caso 3: Roberto (50 anos, Servidor Público Aposentado)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Antes:</p>
                    <p className="text-gray-700">R$ 100k na poupança (R$ 7.300/ano), quer comprar imóvel mas não tem R$ 400k</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Depois:</p>
                    <p className="text-gray-700 font-semibold">R$ 100k em 100 imóveis tokenizados (yield médio 9% = R$ 9.000/ano)</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Ganho:</strong> +23% rendimento, diversificação geográfica, zero gestão de inquilinos. 
                  Recebe R$ 750/mês de aluguel. Renda passiva aumentada sem dor de cabeça de propriedade física.
                </p>
              </div>
            </div>
          </div>

          {/* Como Funciona */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔄 Como Funciona</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tokenização</h3>
                  <p className="text-gray-600">
                    Imóveis reais são tokenizados em milhões de frações usando MPT no XRPL.
                    Cada token representa uma parte proporcional do imóvel.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Investimento</h3>
                  <p className="text-gray-600">
                    Você investe a partir de R$ 100 e recebe tokens proporcionais. Não precisa 
                    conhecer ninguém, intermediários ou burocracia tradicional.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aluguel Automático</h3>
                  <p className="text-gray-600">
                    Mensalmente, o aluguel é depositado em Escrow e distribuído automaticamente
                    de forma proporcional para todos os holders de tokens.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Liquidez 24/7</h3>
                  <p className="text-gray-600">
                    Venda seus tokens a qualquer momento via DEX nativo do XRPL. Trading instantâneo
                    em 3-5 segundos com taxa mínima de R$ 0,002.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
