/**
 * Wallet Connector - Suporte para múltiplas carteiras XRPL
 * Suporta: Xaman, GemWallet, Crossmark, XRPL Labs
 */

export enum WalletType {
  XAMAN = 'xaman',
  GEMWALLET = 'gemwallet',
  CROSSMARK = 'crossmark',
  XRPL_LABS = 'xrpl-labs',
  UNKNOWN = 'unknown'
}

export interface WalletInfo {
  type: WalletType;
  address: string;
  user?: any;
  network?: string;
}

class WalletConnector {
  private detectedWallet: WalletType | null = null;
  private _crossmarkInstance: any | null = null;
  private sessionCheckInterval: NodeJS.Timeout | null = null;
  private onSessionChangeCallback: ((address: string) => void) | null = null;

  /**
   * Detecta qual carteira está disponível no navegador
   */
  async detectWallet(): Promise<WalletType> {
    if (typeof window === 'undefined') {
      return WalletType.UNKNOWN;
    }

    // Verificar se modo mock está ativo
    const mockMode = (window as any).walletMockMode;
    if (mockMode) {
      console.log('🎭 Modo MOCK detectado, usando carteira simulada');
      return WalletType.UNKNOWN; // Será tratado como mock
    }

    // Verificar Crossmark - múltiplas formas
    const win = window as any;
    
    // SDK Crossmark (múltiplas propriedades possíveis)
    if (win.crossmark) {
      console.log('✅ Crossmark SDK detectado');
      this._crossmarkInstance = win.crossmark;
      this.detectedWallet = WalletType.CROSSMARK;
      
      // Adicionar listener para mudanças de sessão
      try {
        if (win.crossmark.on) {
          win.crossmark.on('ready', () => {
            console.log('🔔 Crossmark está pronto');
          });
          win.crossmark.on('event', (event: any) => {
            console.log('🔔 Evento Crossmark:', event);
          });
        }
      } catch (e) {
        console.log('Não foi possível adicionar listeners Crossmark:', e);
      }
      
      return WalletType.CROSSMARK;
    }

    // Crossmark via window.xrpl
    if (win.xrpl && (win.xrpl.isCrossmark || win.xrpl.crossmark)) {
      console.log('✅ Crossmark nativo detectado');
      this._crossmarkInstance = win.xrpl.crossmark || win.xrpl;
      this.detectedWallet = WalletType.CROSSMARK;
      return WalletType.CROSSMARK;
    }

    // Verificar Xaman (XUMM)
    if (win.xumm || win.xrpl?.isXaman) {
      this.detectedWallet = WalletType.XAMAN;
      return WalletType.XAMAN;
    }

    // Verificar GemWallet
    if (win.gemWallet || win.xrpl?.isGemWallet) {
      this.detectedWallet = WalletType.GEMWALLET;
      return WalletType.GEMWALLET;
    }

    return WalletType.UNKNOWN;
  }

  /**
   * Conecta com a carteira detectada
   */
  async connect(): Promise<WalletInfo> {
    const walletType = await this.detectWallet();

    console.log('🔍 Carteira detectada:', walletType);

    switch (walletType) {
      case WalletType.CROSSMARK:
        return await this.connectCrossmark();
      case WalletType.XAMAN:
        return await this.connectXaman();
      case WalletType.GEMWALLET:
        return await this.connectGemWallet();
      default:
        // Verificar se está em modo mock
        if (typeof window !== 'undefined' && (window as any).walletMockMode) {
          console.log('🎭 Usando carteira MOCK');
          const mock = await import('./walletConnectorMock');
          return await mock.walletConnectorMock.connect();
        }
        throw new Error('Nenhuma carteira XRPL detectada. Instale Crossmark, Xaman ou GemWallet.\n\n💡 Para usar modo MOCK, adicione ?mock=true na URL');
    }
  }

  /**
   * Conecta com Crossmark
   */
  private async connectCrossmark(): Promise<WalletInfo> {
    // Usa a instância detectada e armazenada
    const crossmark = this._crossmarkInstance;
    
    if (!crossmark) {
      throw new Error('Crossmark não encontrado. Instale em: https://crossmark.io');
    }
    
    console.log('✅ Usando instância detectada do Crossmark');
    
    // Tentar obter endereço das várias propriedades possíveis
    let address = crossmark.session?.address || 
                  crossmark.session?.user?.address || 
                  crossmark.session?.user ||
                  crossmark.session?.account ||
                  crossmark.address ||
                  crossmark.user?.address ||
                  crossmark.account;
    
    console.log('🔍 Endereço da sessão atual:', address);
    console.log('📦 Session complete:', crossmark.session);
    
    // Se já tiver endereço válido (começa com 'r'), retornar imediatamente
    if (address && typeof address === 'string' && address.startsWith('r')) {
      console.log('✅ Já conectado:', address);
      return {
        type: WalletType.CROSSMARK,
        address: address,
        user: crossmark.session?.user,
        network: 'mainnet'
      };
    }
    
    // Se não houver endereço, mostrar instruções e aguardar o usuário abrir manualmente
    console.log('📝 Aguardando autorização do Crossmark...');
    console.log('ℹ️ O usuário precisa abrir a extensão Crossmark manualmente e autorizar');
    
    // Criar uma Promise que aguarda a sessão ser preenchida
    const connectPromise = new Promise<WalletInfo>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 60; // 60 tentativas de 1 segundo = 1 minuto
      
      const checkSession = setInterval(() => {
        attempts++;
        console.log(`🔄 Verificando sessão... (${attempts}/${maxAttempts})`);
        
        // Verificar endereço de todas as formas possíveis
        const currentAddress = crossmark.session?.address || 
                              crossmark.session?.user?.address || 
                              crossmark.session?.user ||
                              crossmark.session?.account ||
                              crossmark.address ||
                              crossmark.user?.address ||
                              crossmark.account;
        
        console.log('📍 Endereço encontrado:', currentAddress);
        console.log('📦 Sessão:', {
          address: crossmark.session?.address,
          user: crossmark.session?.user,
          isOpen: crossmark.session?.isOpen,
          network: crossmark.session?.network
        });
        
        if (currentAddress && typeof currentAddress === 'string' && currentAddress.startsWith('r')) {
          console.log('✅ CONECTADO! Endereço:', currentAddress);
          clearInterval(checkSession);
          resolve({
            type: WalletType.CROSSMARK,
            address: currentAddress,
            user: crossmark.session?.user,
            network: crossmark.session?.network || 'mainnet'
          });
        }
        
        // Timeout após 60 segundos
        if (attempts >= maxAttempts) {
          console.log('❌ Timeout aguardando autorização do Crossmark');
          clearInterval(checkSession);
          reject(new Error('❌ Aguardando autorização do Crossmark...\n\nPor favor:\n1. Clique no ícone do Crossmark na barra de extensões\n2. Autorize esta conexão\n3. Recarregue a página (F5)'));
        }
      }, 1000); // Verifica a cada 1 segundo
      
      // Limpar intervalo quando o componente desmontar
      setTimeout(() => clearInterval(checkSession), maxAttempts * 1000);
    });
    
    try {
      const result = await connectPromise;
      return result;
    } catch (e: any) {
      console.error('❌ Erro na conexão:', e);
      throw e;
    }
  }

  /**
   * Conecta com Xaman (XUMM)
   */
  private async connectXaman(): Promise<WalletInfo> {
    try {
      const xumm = (window as any).xumm;
      
      if (!xumm) {
        throw new Error('Xaman não detectado');
      }

      console.log('🔌 Conectando com Xaman...');

      // Solicitar conexão do Xaman
      const result = await xumm.runtime.getCurrentAccount();
      
      if (!result || !result.address) {
        throw new Error('Não foi possível obter endereço do Xaman');
      }

      return {
        type: WalletType.XAMAN,
        address: result.address,
        user: result,
        network: 'mainnet'
      };
    } catch (error) {
      console.error('Erro ao conectar com Xaman:', error);
      throw error;
    }
  }

  /**
   * Conecta com GemWallet
   */
  private async connectGemWallet(): Promise<WalletInfo> {
    try {
      const win = window as any;
      const gemWallet = win.gemWallet;
      
      console.log('🔌 Tentando conectar com GemWallet...');
      console.log('📦 GemWallet disponível:', !!gemWallet);
      console.log('📦 window.gemWallet:', gemWallet);
      
      if (!gemWallet) {
        console.log('❌ GemWallet não está em window.gemWallet');
        console.log('📦 Verificando window.xrpl...');
        console.log('📦 window.xrpl:', win.xrpl);
        
        // Tentar via window.xrpl se disponível
        if (win.xrpl && win.xrpl.isGemWallet) {
          console.log('✅ GemWallet encontrado via window.xrpl!');
          // Aqui você pode usar win.xrpl como gemWallet
          throw new Error('GemWallet detectado mas não implementado via window.xrpl ainda. Use window.gemWallet');
        }
        
        throw new Error('GemWallet não detectado. Instale a extensão GemWallet.');
      }

      console.log('📦 GemWallet object keys:', Object.keys(gemWallet));
      console.log('📦 gemWallet.connect:', typeof gemWallet.connect);
      
      console.log('📞 Chamando gemWallet.connect()...');

      // Solicitar conexão do GemWallet
      const result = await gemWallet.connect();
      
      console.log('📥 Resultado connect():', result);
      console.log('📥 Resultado tipo:', typeof result);
      console.log('📥 Resultado keys:', result ? Object.keys(result) : 'null');
      
      if (!result) {
        throw new Error('GemWallet retornou resultado vazio');
      }
      
      if (!result.address) {
        console.error('❌ Resultado não contém endereço:', result);
        throw new Error('Não foi possível obter endereço do GemWallet. Resposta: ' + JSON.stringify(result));
      }

      console.log('✅ Endereço obtido:', result.address);

      return {
        type: WalletType.GEMWALLET,
        address: result.address,
        user: result,
        network: result.network || 'mainnet',
        publicKey: result.publicKey
      };
    } catch (error: any) {
      console.error('❌ Erro ao conectar com GemWallet:', error);
      console.error('❌ Stack:', error.stack);
      
      // Mensagem de erro mais amigável
      const errorMessage = error?.message || 'Erro desconhecido ao conectar com GemWallet';
      throw new Error(`GemWallet: ${errorMessage}`);
    }
  }

  /**
   * Desconecta da carteira
   */
  disconnect(): void {
    if (!this.detectedWallet) {
      return;
    }

    switch (this.detectedWallet) {
      case WalletType.CROSSMARK:
        if ((window as any).crossmark) {
          // Crossmark não tem método de desconexão explícito
        }
        break;
      case WalletType.XAMAN:
        if ((window as any).xumm) {
          // Xaman não tem método de desconexão explícito
        }
        break;
      case WalletType.GEMWALLET:
        if ((window as any).gemWallet) {
          // GemWallet não tem método de desconexão explícito
        }
        break;
    }

    this.detectedWallet = null;
  }

  /**
   * Retorna o tipo de carteira detectada
   */
  getWalletType(): WalletType | null {
    return this.detectedWallet;
  }

  /**
   * Registra callback para mudanças de sessão
   */
  onSessionChange(callback: (address: string) => void): void {
    this.onSessionChangeCallback = callback;
    this.startSessionMonitoring();
  }

  /**
   * Inicia monitoramento de sessão do Crossmark
   */
  private startSessionMonitoring(): void {
    if (this.sessionCheckInterval) {
      return; // Já está monitorando
    }

    this.sessionCheckInterval = setInterval(() => {
      const win = window as any;
      if (win.crossmark && this.onSessionChangeCallback) {
        const crossmark = win.crossmark;
        let address = crossmark.session?.address || 
                     crossmark.session?.user?.address || 
                     crossmark.session?.user ||
                     crossmark.session?.account ||
                     crossmark.address ||
                     crossmark.user?.address ||
                     crossmark.account;
        
        if (address && typeof address === 'string' && address.startsWith('r')) {
          this.onSessionChangeCallback(address);
        }
      }
    }, 2000); // Verificar a cada 2 segundos
  }

  /**
   * Para o monitoramento de sessão
   */
  stopSessionMonitoring(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }
}

export default new WalletConnector();

