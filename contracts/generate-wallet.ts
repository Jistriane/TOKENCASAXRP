/**
 * Script para Gerar Wallet de Teste
 * 
 * Este script gera uma nova wallet para testes no XRPL Testnet
 * 
 * Uso:
 *   npm run generate:wallet
 */

import { Wallet } from 'xrpl';

function generateWallet() {
  console.log('🔑 Gerando nova wallet para XRPL Testnet...\n');

  const wallet = Wallet.generate();
  
  console.log('✅ Wallet gerada com sucesso!\n');
  console.log('═'.repeat(70));
  console.log('📝 INFORMAÇÕES DA WALLET:');
  console.log('═'.repeat(70));
  console.log('\n🌐 Endereço:');
  console.log(`   ${wallet.address}\n`);
  
  console.log('🔐 Secret (GUARDE EM SEGREDO):');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secret = (wallet as any).seed || (wallet as any).privateKey || 'N/A';
  console.log(`   ${secret}\n`);
  
  console.log('🔑 Public Key:');
  console.log(`   ${wallet.publicKey}\n`);
  
  console.log('🔓 Address:');
  console.log(`   ${wallet.address}\n`);
  
  console.log('═'.repeat(70));
  console.log('\n⚠️  PRÓXIMOS PASSOS:\n');
  console.log('1. Copie o endereço acima');
  console.log('2. Acesse: https://xrpl.org/xrp-testnet-faucet.html');
  console.log('3. Cole o endereço e solicite fundos de teste');
  console.log('4. Use o secret para fazer deploy:\n');
  console.log('   npm run deploy:testnet\n');
  console.log('═'.repeat(70));
  console.log('\n💡 Dica: Guarde o secret de forma segura!\n');
  
  return wallet;
}

// Executar
const wallet = generateWallet();

// Exportar para uso em outros scripts
export { wallet };

