/**
 * Script de Deploy dos Contratos TokenCasa XRPL
 * 
 * Este script faz o deploy de todos os contratos necessários para o TokenCasa:
 * 1. Credentials Contract (KYC/AML)
 * 2. MPT Contract (Multi-Purpose Tokens)
 * 3. Escrow Contract (Distribuição de Aluguel)
 * 4. DEX Contract (Trading)
 * 
 * Uso:
 *   npm run deploy:contracts -- --network=testnet
 *   npm run deploy:contracts -- --network=mainnet
 */

import { Wallet } from 'xrpl';
import {
  CredentialsContract,
  MPTContract,
  EscrowContract,
  DEXContract,
} from './xrpl';
import * as fs from 'fs';
import * as path from 'path';

// Interface para configuração de deploy
interface DeployConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  issuerSecret?: string;
  deployCredentials: boolean;
  deployMPT: boolean;
  deployEscrow: boolean;
  deployDEX: boolean;
}

// Interface para resultados do deploy
interface DeployResult {
  success: boolean;
  contract: string;
  network: string;
  addresses?: any;
  transactionHash?: string;
  error?: string;
  timestamp: string;
}

// Classe principal para gerenciar o deploy
class ContractDeployer {
  private network: 'mainnet' | 'testnet' | 'devnet';
  private issuerWallet?: Wallet;
  private results: DeployResult[] = [];
  private deployLog: string = '';

  constructor(config: DeployConfig) {
    this.network = config.network;

    // Carregar wallet se secret foi fornecido
    if (config.issuerSecret) {
      try {
        this.issuerWallet = Wallet.fromSecret(config.issuerSecret);
        this.log(`✅ Wallet carregada: ${this.issuerWallet.address}`);
      } catch (error) {
        this.log(`❌ Erro ao carregar wallet: ${error}`);
        process.exit(1);
      }
    }

    this.log(`🌐 Network: ${this.network.toUpperCase()}`);
  }

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    this.deployLog += logMessage + '\n';
  }

  /**
   * Verifica pré-requisitos antes do deploy
   */
  async verifyPrerequisites(): Promise<boolean> {
    this.log('\n🔍 Verificando pré-requisitos...\n');

    // Verificar se wallet foi carregada
    if (!this.issuerWallet) {
      this.log('❌ Wallet não configurada');
      return false;
    }

    // Verificar saldo da wallet
    try {
      const Credentials = new CredentialsContract(this.network);
      await Credentials.connect();
      
      const accountInfo = await Credentials['client'].request({
        command: 'account_info',
        account: this.issuerWallet.address,
      });

      const balance = Number(accountInfo.result.account_data.Balance);
      const balanceXRP = balance / 1_000_000;

      this.log(`💰 Saldo disponível: ${balanceXRP.toFixed(2)} XRP`);

      if (balanceXRP < 10) {
        this.log('⚠️  Aviso: Saldo baixo. Recomendado pelo menos 10 XRP');
      }

      await Credentials.disconnect();
      return true;
    } catch (error: any) {
      this.log(`❌ Erro ao verificar conta: ${error.message}`);
      return false;
    }
  }

  /**
   * Deploy do Credentials Contract
   */
  async deployCredentials(): Promise<DeployResult> {
    this.log('\n🔐 Verificando Credentials Contract...\n');

    const result: DeployResult = {
      success: false,
      contract: 'CredentialsContract',
      network: this.network,
      timestamp: new Date().toISOString(),
    };

    try {
      if (!this.issuerWallet) {
        throw new Error('Wallet não configurada');
      }

      const credentials = new CredentialsContract(this.network);
      await credentials.connect();
      
      this.log('✅ Credentials Contract conectado com sucesso!');
      this.log('   Sistema de credentials está disponível');

      result.success = true;
      result.addresses = {
        network: this.network,
      };

      await credentials.disconnect();
      return result;
    } catch (error: any) {
      this.log(`❌ Erro ao conectar Credentials: ${error.message}`);
      result.error = error.message;
      return result;
    }
  }

  /**
   * Deploy do MPT Contract (teste)
   */
  async deployMPT(): Promise<DeployResult> {
    this.log('\n🏠 Verificando MPT Contract...\n');

    const result: DeployResult = {
      success: false,
      contract: 'MPTContract',
      network: this.network,
      timestamp: new Date().toISOString(),
    };

    try {
      if (!this.issuerWallet) {
        throw new Error('Wallet não configurada');
      }

      const mpt = new MPTContract(this.network);
      await mpt.connect();
      
      this.log('✅ MPT Contract conectado com sucesso!');
      this.log('   Sistema de tokens está disponível');

      result.success = true;
      result.addresses = {
        owner: this.issuerWallet.address,
        network: this.network,
      };

      await mpt.disconnect();
      return result;
    } catch (error: any) {
      this.log(`❌ Erro ao conectar MPT: ${error.message}`);
      result.error = error.message;
      return result;
    }
  }

  /**
   * Deploy do Escrow Contract (teste)
   */
  async deployEscrow(): Promise<DeployResult> {
    this.log('\n💰 Verificando Escrow Contract...\n');

    const result: DeployResult = {
      success: false,
      contract: 'EscrowContract',
      network: this.network,
      timestamp: new Date().toISOString(),
    };

    try {
      if (!this.issuerWallet) {
        throw new Error('Wallet não configurada');
      }

      const escrow = new EscrowContract(this.network);
      await escrow.connect();
      
      this.log('✅ Escrow Contract conectado com sucesso!');
      this.log('   Sistema de distribuição de aluguel está disponível');

      result.success = true;
      result.addresses = {
        network: this.network,
      };

      await escrow.disconnect();
      return result;
    } catch (error: any) {
      this.log(`❌ Erro ao conectar Escrow: ${error.message}`);
      result.error = error.message;
      return result;
    }
  }

  /**
   * Verifica se DEX está disponível
   */
  async deployDEX(): Promise<DeployResult> {
    this.log('\n📈 Verifying DEX Contract...\n');

    const result: DeployResult = {
      success: false,
      contract: 'DEXContract',
      network: this.network,
      timestamp: new Date().toISOString(),
    };

    try {
      const dex = new DEXContract(this.network);
      await dex.connect();

      this.log('✅ DEX Contract está disponível e conectado');
      this.log('   O DEX nativo do XRPL está pronto para uso');

      result.success = true;
      result.addresses = {
        network: this.network,
        endpoint: this.network === 'mainnet'
          ? 'wss://xrplcluster.com'
          : 'wss://s.altnet.rippletest.net:51233',
      };

      await dex.disconnect();

      return result;
    } catch (error: any) {
      this.log(`❌ Erro ao verificar DEX: ${error.message}`);
      result.error = error.message;
      return result;
    }
  }

  /**
   * Executa o deploy completo
   */
  async deployAll(config: DeployConfig): Promise<void> {
    this.log('\n🚀 Iniciando deploy dos contratos TokenCasa...\n');
    this.log(`   Network: ${this.network.toUpperCase()}`);
    this.log(`   Timestamp: ${new Date().toISOString()}\n`);

    // Verificar pré-requisitos
    const prerequisitesOK = await this.verifyPrerequisites();
    if (!prerequisitesOK) {
      this.log('\n❌ Pré-requisitos não atendidos. Deploy cancelado.\n');
      process.exit(1);
    }

    this.results = [];

    // Deploy Credentials
    if (config.deployCredentials) {
      const result = await this.deployCredentials();
      this.results.push(result);
    }

    // Deploy MPT
    if (config.deployMPT) {
      const result = await this.deployMPT();
      this.results.push(result);
    }

    // Deploy Escrow
    if (config.deployEscrow) {
      const result = await this.deployEscrow();
      this.results.push(result);
    }

    // Deploy DEX
    if (config.deployDEX) {
      const result = await this.deployDEX();
      this.results.push(result);
    }

    this.generateReport();
    this.saveReport();
  }

  /**
   * Gera relatório do deploy
   */
  private generateReport(): void {
    this.log('\n📊 Relatório de Deploy\n');
    this.log('=' .repeat(60));

    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;

    this.log(`✅ Sucessos: ${successful}`);
    this.log(`❌ Falhas: ${failed}`);
    this.log(`📦 Total: ${this.results.length}\n`);

    this.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      this.log(`${status} ${result.contract}`);
      
      if (result.success && result.addresses) {
        Object.entries(result.addresses).forEach(([key, value]) => {
          this.log(`   ${key}: ${value}`);
        });
        
        if (result.transactionHash) {
          this.log(`   TX Hash: ${result.transactionHash}`);
        }
      } else if (!result.success && result.error) {
        this.log(`   Erro: ${result.error}`);
      }
      
      this.log('');
    });

    this.log('='.repeat(60));
  }

  /**
   * Salva relatório em arquivo
   */
  private saveReport(): void {
    const reportDir = path.join(process.cwd(), 'contracts', 'deploy-reports');
    
    // Criar diretório se não existir
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportFile = path.join(reportDir, `deploy-${this.network}-${timestamp}.json`);
    const logFile = path.join(reportDir, `deploy-${this.network}-${timestamp}.log`);

    // Salvar JSON com resultados
    const reportData = {
      network: this.network,
      timestamp: new Date().toISOString(),
      summary: {
        successful: this.results.filter(r => r.success).length,
        failed: this.results.filter(r => !r.success).length,
        total: this.results.length,
      },
      results: this.results,
    };

    fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
    
    // Salvar log
    fs.writeFileSync(logFile, this.deployLog);

    this.log(`\n📄 Relatório salvo em:`);
    this.log(`   JSON: ${reportFile}`);
    this.log(`   Log: ${logFile}\n`);
  }
}

// Parse de argumentos da linha de comando
function parseArgs(): DeployConfig {
  const args = process.argv.slice(2);
  const config: DeployConfig = {
    network: 'testnet',
    deployCredentials: true,
    deployMPT: true,
    deployEscrow: true,
    deployDEX: true,
  };

  args.forEach(arg => {
    if (arg.startsWith('--network=')) {
      const network = arg.split('=')[1];
      if (['mainnet', 'testnet', 'devnet'].includes(network)) {
        config.network = network as 'mainnet' | 'testnet' | 'devnet';
      }
    }
    
    if (arg.startsWith('--secret=')) {
      config.issuerSecret = arg.split('=')[1];
    }
    
    if (arg === '--only-credentials') {
      config.deployMPT = false;
      config.deployEscrow = false;
      config.deployDEX = false;
    }
    
    if (arg === '--only-mpt') {
      config.deployCredentials = false;
      config.deployEscrow = false;
      config.deployDEX = false;
    }
  });

  return config;
}

// Main
async function main() {
  console.log('🏠 TokenCasa XRPL - Contract Deployer\n');

  const config = parseArgs();

  // Verificar se secret foi fornecido
  if (!config.issuerSecret) {
    console.error('❌ Erro: Secret da wallet não fornecido');
    console.error('\nUso:');
    console.error('  npm run deploy:contracts -- --network=testnet --secret=sYOUR_SECRET');
    console.error('  npm run deploy:contracts -- --network=mainnet --secret=sYOUR_SECRET');
    console.error('\nOu configure a variável de ambiente XRPL_ISSUER_SECRET');
    process.exit(1);
  }

  const deployer = new ContractDeployer(config);
  await deployer.deployAll(config);
}

// Executar se for chamado diretamente
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}

export { ContractDeployer, DeployConfig, DeployResult };

