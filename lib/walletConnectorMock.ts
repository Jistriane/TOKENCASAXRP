/**
 * Wallet Connector Mock - Para desenvolvimento e testes
 * Permite testar a aplicação sem precisar de uma carteira real conectada
 */

import { WalletType, WalletInfo } from './walletConnector';

class WalletConnectorMock {
  private isMockMode = false;
  private mockAddress = 'rTEST1234567890123456789012345678901234567';
  private mockBalance = '1000.00';

  /**
   * Ativa o modo mock
   */
  enable(): void {
    this.isMockMode = true;
    console.log('🎭 Modo MOCK ativado - Usando carteira simulada');
    console.log('🎭 Endereço Mock:', this.mockAddress);
  }

  /**
   * Desativa o modo mock
   */
  disable(): void {
    this.isMockMode = false;
    console.log('🎭 Modo MOCK desativado - Usando carteira real');
  }

  /**
   * Verifica se está em modo mock
   */
  isEnabled(): boolean {
    return this.isMockMode;
  }

  /**
   * Detecta "carteira" mock (sempre disponível)
   */
  async detectWallet(): Promise<WalletType> {
    if (this.isMockMode) {
      console.log('🎭 Carteira Mock detectada');
      return WalletType.UNKNOWN; // Usa UNKNOWN para que seja tratada como mock
    }
    return WalletType.UNKNOWN;
  }

  /**
   * Conecta com a carteira mock
   */
  async connect(): Promise<WalletInfo> {
    if (!this.isMockMode) {
      throw new Error('Modo mock não está ativado');
    }

    console.log('🎭 Conectando com carteira MOCK...');
    
    // Simular um delay de conexão
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('✅ Carteira Mock conectada!');
    console.log('📍 Endereço:', this.mockAddress);
    console.log('💰 Saldo:', this.mockBalance, 'XRP');

    return {
      type: WalletType.UNKNOWN,
      address: this.mockAddress,
      network: 'mainnet',
      user: {
        name: 'Usuário Mock',
        address: this.mockAddress
      }
    };
  }

  /**
   * Desconecta da carteira mock
   */
  disconnect(): void {
    if (this.isMockMode) {
      console.log('🎭 Desconectando da carteira Mock');
    }
  }

  /**
   * Retorna informações da carteira mock
   */
  getMockInfo() {
    return {
      address: this.mockAddress,
      balance: this.mockBalance
    };
  }

  /**
   * Atualiza o endereço mock
   */
  setMockAddress(address: string): void {
    if (!address.startsWith('r') || address.length !== 35) {
      throw new Error('Endereço XRPL inválido. Deve começar com "r" e ter 35 caracteres.');
    }
    this.mockAddress = address;
    console.log('🎭 Endereço mock atualizado:', address);
  }

  /**
   * Atualiza o saldo mock
   */
  setMockBalance(balance: string): void {
    this.mockBalance = balance;
    console.log('🎭 Saldo mock atualizado:', balance);
  }
}

export const walletConnectorMock = new WalletConnectorMock();

// Ativar modo mock automaticamente em desenvolvimento se a flag estiver ativa
if (typeof window !== 'undefined') {
  // Verificar se há um parâmetro na URL
  const urlParams = new URLSearchParams(window.location.search);
  const mockParam = urlParams.get('mock');
  
  // Verificar localStorage
  const mockLocalStorage = localStorage.getItem('wallet_mock_mode');
  
  if (mockParam === 'true' || mockParam === '1' || mockLocalStorage === 'true') {
    walletConnectorMock.enable();
    console.log('🎭 Modo MOCK ativado via URL ou localStorage');
    console.log('🎭 Para desativar, remova ?mock=true da URL ou limpe o localStorage');
  }
}

