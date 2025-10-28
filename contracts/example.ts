/**
 * Exemplo Prático de Uso dos Contratos TokenCasa
 * 
 * Este arquivo demonstra como usar os contratos para:
 * 1. Tokenizar um imóvel (criar MPT)
 * 2. Emitir credentials para investidores
 * 3. Criar escrow para distribuição de aluguel
 * 4. Listar tokens no DEX para trading
 */

import { Wallet } from 'xrpl';
import {
  MPTContract,
  EscrowContract,
  CredentialsContract,
  DEXContract,
} from './xrpl';

// Configuração
const NETWORK = 'testnet';
const ISSUER_SECRET = 's...'; // Secret da carteira emissora
const INVESTOR_SECRET = 's...'; // Secret da carteira do investidor

async function main() {
  console.log('🏠 TokenCasa - Exemplo de Uso dos Contratos\n');

  // Criar wallets
  const issuerWallet = Wallet.fromSecret(ISSUER_SECRET);
  const investorWallet = Wallet.fromSecret(INVESTOR_SECRET);

  console.log('📝 Passo 1: Criar MPT para imóvel\n');
  
  const mpt = new MPTContract(NETWORK);
  
  const mptConfig = {
    propertyId: 'apt-001',
    propertyName: 'Apartamento Copacabana - RJ',
    totalSupply: 1000000, // 1M tokens = 100% do imóvel
    ownerAddress: issuerWallet.address,
    ipfsMetadataHash: 'QmRandomHash123...',
    credentialRequirement: 'BR-Investor-Verified'
  };

  const mptToken = await mpt.createMPT(mptConfig, issuerWallet);
  console.log('✅ MPT criado:', mptToken.id);
  console.log('   Supply:', mptToken.supply, 'tokens\n');

  console.log('🔐 Passo 2: Emitir Credential para Investidor\n');
  
  const credentials = new CredentialsContract(NETWORK);
  
  const credentialConfig = {
    issuerAddress: issuerWallet.address,
    targetAddress: investorWallet.address,
    credentialType: 'BR-Investor-Verified',
    credentialValue: {
      verified: true,
      verifiedAt: new Date(),
      level: 'standard'
    }
  };

  const credential = await credentials.issueCredential(
    credentialConfig,
    issuerWallet
  );
  console.log('✅ Credential emitida:', credential.id, '\n');

  console.log('💰 Passo 3: Criar Escrow para Distribuição de Aluguel\n');
  
  const escrow = new EscrowContract(NETWORK);
  
  // Calcular data de distribuição (próximo dia 5 do mês)
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(5);
  
  const escrowConfig = {
    propertyId: 'apt-001',
    propertyName: 'Apartamento Copacabana - RJ',
    totalRent: 6000, // R$ 6.000 de aluguel
    totalTokens: 1000000,
    releaseDate: nextMonth
  };

  const escrowInfo = await escrow.createEscrow(escrowConfig, issuerWallet);
  console.log('✅ Escrow criado:', escrowInfo.id);
  console.log('   Rent per Token: R$', escrowInfo.rentPerToken.toFixed(6));
  console.log('   Release Date:', escrowInfo.releaseDate.toLocaleDateString('pt-BR'), '\n');

  console.log('📈 Passo 4: Criar Ordem de Compra no DEX\n');
  
  const dex = new DEXContract(NETWORK);
  
  const orderConfig = {
    account: investorWallet.address,
    takerPays: '500', // 500 XRP
    takerGets: {
      currency: mptToken.id,
      value: '625', // ~625 tokens
      issuer: issuerWallet.address
    }
  };

  const orderHash = await dex.createBuyOrder(orderConfig, investorWallet);
  console.log('✅ Ordem de compra criada:', orderHash, '\n');

  console.log('📊 Consultando Informações\n');
  
  // Verificar saldo do investidor
  const balance = await mpt.getBalance(investorWallet.address, mptToken.id);
  console.log('   Saldo do investidor:', balance, 'tokens');
  
  // Verificar credential
  const hasCredential = await credentials.hasCredential(
    investorWallet.address,
    'BR-Investor-Verified'
  );
  console.log('   Tem credential:', hasCredential ? 'Sim' : 'Não');

  console.log('\n✅ Exemplo completo!\n');
}

// Executar exemplo
main().catch(console.error);

/**
 * Exemplo de Distribuição de Aluguel
 */
async function exampleDistributeRent() {
  console.log('🏠 Exemplo: Distribuição de Aluguel\n');

  const escrow = new EscrowContract(NETWORK);
  const issuerWallet = Wallet.fromSecret(ISSUER_SECRET);

  const escrowId = 'escrow_hash_123';
  
  // Lista de holders
  const holders = [
    { address: 'rAddress1...', tokens: 625 },
    { address: 'rAddress2...', tokens: 1000 },
    { address: 'rAddress3...', tokens: 500 },
  ];

  // Finalizar escrow e distribuir
  const distributions = await escrow.finishEscrow(
    escrowId,
    issuerWallet,
    holders
  );

  console.log('✅ Aluguel distribuído para', distributions.length, 'holders\n');
  
  distributions.forEach((dist, index) => {
    console.log(`   ${index + 1}. ${dist.address}: R$ ${dist.payment.toFixed(2)}`);
  });
}

// Descomentar para executar exemplo de distribuição
// exampleDistributeRent().catch(console.error);

export { main, exampleDistributeRent };
