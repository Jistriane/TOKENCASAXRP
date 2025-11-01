'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from 'xrpl';
import walletConnector from '@/lib/walletConnector';
import CrossmarkModal from '@/components/CrossmarkModal';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  hasCredential: boolean;
  isConnecting: boolean;
  waitingForAuth: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  client: Client | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [hasCredential, setHasCredential] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);

  // Check for stored credential and wallet on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCredential = localStorage.getItem('credential_verified');
      if (storedCredential === 'true') {
        setHasCredential(true);
      }
      
      // Verificar se há wallet conectado salvo
      const storedAddress = localStorage.getItem('wallet_address');
      if (storedAddress) {
        const win = window as any;
        if (win.crossmark) {
          // Se já tem endereço salvo e crossmark está disponível, assumir que está conectado
          console.log('🔄 Restaurando sessão salva:', storedAddress);
        }
      }
    }
  }, []);

  // Auto-detecta sessão ativa do Crossmark ao carregar e monitora mudanças
  useEffect(() => {
    let mounted = true;
    
    // Função para conectar automaticamente quando detectar sessão
    const autoConnect = async (addressParam: string) => {
      if (isConnected || isConnecting) {
        return;
      }
      
      try {
        setIsConnecting(true);
        console.log('🔍 Sessão Crossmark detectada automaticamente:', addressParam);
        setAddress(addressParam);
        setIsConnected(true);
        setHasCredential(true);
        
        // Conectar XRPL e buscar saldo
        try {
          const network = process.env.NEXT_PUBLIC_XRPL_NETWORK || 'testnet';
          const endpoint = network === 'mainnet' 
            ? 'wss://xrplcluster.com'
            : 'wss://s.altnet.rippletest.net:51233';
          const xrplClient = new Client(endpoint);
          await xrplClient.connect();
          setClient(xrplClient);
          
          const accountData = await xrplClient.request({
            command: 'account_info',
            account: addressParam,
          });
          
          const balance = accountData.result.account_data?.Balance;
          if (balance) {
            setBalance((Number(balance) / 1000000).toFixed(2));
          }
        } catch (xrplError) {
          console.log('Erro XRPL:', xrplError);
          setBalance('N/A');
        }
        
        if (mounted) {
          setIsConnecting(false);
          console.log('✅ Conexão automática concluída!');
        }
      } catch (error) {
        if (mounted) {
          setIsConnecting(false);
        }
        console.log('Erro na auto-conexão:', error);
      }
    };
    
    const autoDetectWallet = async () => {
      try {
        
        // Verificar se Crossmark está disponível e já conectado
        const win = window as any;
        if (win.crossmark) {
          const crossmark = win.crossmark;
          let address = crossmark.session?.address || 
                       crossmark.session?.user?.address || 
                       crossmark.session?.user ||
                       crossmark.session?.account ||
                       crossmark.address ||
                       crossmark.user?.address ||
                       crossmark.account;
          
          if (address && typeof address === 'string' && address.startsWith('r')) {
            await autoConnect(address);
          }
        }
      } catch (error) {
        console.log('Auto-detecção de carteira não disponível:', error);
      }
    };
    
    autoDetectWallet();
    
    // Registrar callback para mudanças de sessão
    walletConnector.onSessionChange(async (newAddress: string) => {
      if (mounted && !isConnected && !isConnecting) {
        await autoConnect(newAddress);
      }
    });

    return () => {
      mounted = false;
      walletConnector.stopSessionMonitoring();
    };
  }, [isConnected, isConnecting]);

  const connect = async () => {
    if (isConnecting) {
      console.log('⏳ Já está conectando...');
      return;
    }
    
    try {
      setIsConnecting(true);
      setWaitingForAuth(true);
      console.log('🔌 Iniciando conexão com carteira XRPL...');
      
      // Usar o conector universal
      const walletInfo = await walletConnector.connect();
      console.log('✅ Carteira conectada:', walletInfo);
      
      if (!walletInfo.address) {
        throw new Error('Não foi possível obter endereço da carteira.');
      }
      
      console.log('✅ Endereço obtido:', walletInfo.address);
      setAddress(walletInfo.address);
      setIsConnected(true);
      setWaitingForAuth(false);
      
      // Salvar endereço para reconexão automática futura
      localStorage.setItem('wallet_address', walletInfo.address);
      localStorage.setItem('credential_verified', 'true');
      
      // Conectar XRPL e buscar saldo
      try {
        console.log('🌐 Conectando ao XRPL...');
        const network = process.env.NEXT_PUBLIC_XRPL_NETWORK || 'testnet';
        const endpoint = network === 'mainnet' 
          ? 'wss://xrplcluster.com'
          : 'wss://s.altnet.rippletest.net:51233';
        const xrplClient = new Client(endpoint);
        await xrplClient.connect();
        setClient(xrplClient);
        
        console.log('📊 Buscando informações da conta...');
        const accountData = await xrplClient.request({
          command: 'account_info',
          account: walletInfo.address,
        });
        
        const balance = accountData.result.account_data?.Balance;
        if (balance) {
          setBalance((Number(balance) / 1000000).toFixed(2));
          console.log('💰 Saldo:', balance);
        }
      } catch (xrplError) {
        console.log('Erro XRPL:', xrplError);
        setBalance('N/A');
      }
      
      setHasCredential(true);
      setIsConnecting(false);
      console.log('✅ Conexão concluída com sucesso!');
      
    } catch (error: any) {
      setIsConnecting(false);
      setWaitingForAuth(false);
      
      console.error('❌ Erro ao conectar:', error);
      const errorMessage = error?.message || error?.toString() || 'Erro desconhecido ao conectar';
      
      // Mostrar alerta apenas se o erro mencionar aguardar autorização
      if (errorMessage.includes('Aguardando') || errorMessage.includes('autorização')) {
        alert('⚠️ Aguardando autorização do Crossmark\n\nPor favor:\n1. Clique no ícone do Crossmark na barra de extensões\n2. Autorize esta conexão\n3. Aguarde até 1 minuto ou clique em "Conectar Carteira" novamente');
      } else {
        // Exibir erro genérico com instruções
        let userMessage = `Erro ao conectar: ${errorMessage}`;
        if (errorMessage.toLowerCase().includes('crossmark') || errorMessage.toLowerCase().includes('não encontrado')) {
          userMessage += '\n\nParece que a extensão Crossmark não está instalada ou não está acessível. Instale-a em https://crossmark.io/ e tente novamente.';
        }
        alert(userMessage);
      }
    }
  };

  const disconnect = () => {
    if (client) {
      client.disconnect();
    }
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setClient(null);
    
    // Limpar dados salvos
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('credential_verified');
  };

  useEffect(() => {
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [client]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        hasCredential,
        isConnecting,
        waitingForAuth,
        connect,
        disconnect,
        client,
      }}
    >
      <CrossmarkModal
        open={waitingForAuth}
        onClose={() => setWaitingForAuth(false)}
        isLoading={isConnecting}
        onRetry={async () => {
          try {
            setWaitingForAuth(true);
            await walletConnector.requestSignIn();
            // após tentativa, re-executa connect() para finalizar fluxo
            await connect();
          } catch (e) {
            console.error('Falha ao forçar sign-in:', e);
            alert('Não foi possível abrir o Crossmark automaticamente. Por favor, abra a extensão e autorize manualmente.');
          } finally {
            setWaitingForAuth(false);
          }
        }}
      />
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

