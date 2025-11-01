// Conector SIMPLES que pede ao usuário para conectar manualmente
// Em seguida, detecta a sessão automaticamente

import { WalletType, WalletInfo } from './walletConnector';

class SimpleWalletConnector {
  async connectCrossmark(): Promise<WalletInfo> {
    const win = window as any;
    const crossmark = win.crossmark;
    
    if (!crossmark) {
      throw new Error('Crossmark não encontrado. Instale em: https://crossmark.io');
    }
    
    console.log('🔍 Verificando Crossmark...');
    console.log('📦 Session:', crossmark.session);
    
    // Verificar endereço disponível
    let address = crossmark.session?.address || 
                  crossmark.session?.user?.address || 
                  crossmark.session?.user;
    
    console.log('📍 Endereço encontrado:', address);
    
    // Se já conectado, retornar
    if (address && address.toString().startsWith('r')) {
      console.log('✅ Já conectado!');
      return {
        type: WalletType.CROSSMARK,
        address: address.toString(),
        user: crossmark.session?.user,
        network: 'mainnet'
      };
    }
    
    // Se não conectado, solicitar ao usuário
    console.log('⚠️ Não conectado. Solicitando autorização...');
    
    try {
      // Tentar conectar
      if (crossmark.async?.connect) {
        await crossmark.async.connect();
        console.log('✅ Connect() chamado');
      }
      
      // Aguardar 5 segundos verificando a cada 500ms
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        address = crossmark.session?.address || 
                crossmark.session?.user?.address || 
                crossmark.session?.user;
        
        if (address && address.toString().startsWith('r')) {
          console.log('✅ Conectado!');
          return {
            type: WalletType.CROSSMARK,
            address: address.toString(),
            user: crossmark.session?.user,
            network: 'mainnet'
          };
        }
      }
      
      // Se ainda não conectado, orientar usuário
      throw new Error('MANUAL');
      
    } catch (e: any) {
      if (e.message === 'MANUAL' || !address) {
        alert(
          '📱 CONECTE MANUALMENTE:\n\n' +
          '1. Clique no ÍCONE do Crossmark (canto superior direito do Chrome)\n' +
          '2. Clique em "Conectar" ou "Connect"\n' +
          '3. Autorize localhost:3000\n' +
          '4. Depois clique em OK aqui\n' +
          '5. A página vai recarregar automaticamente'
        );
        
        // Recarregar página após 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
        throw new Error('Aguardando autorização manual...');
      }
      throw e;
    }
  }
}

const simpleWalletConnector = new SimpleWalletConnector();
export default simpleWalletConnector;

