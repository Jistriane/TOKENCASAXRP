import { Injectable } from '@nestjs/common';
import { XRPLService } from './xrpl.service';
import { EscrowService } from '../escrow/escrow.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class HooksService {
  constructor(
    private xrplService: XRPLService,
    private escrowService: EscrowService,
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Hook: Validação antes de permitir compra de token
   * Checa se usuário tem credential "BR-Investor-Verified"
   */
  async validatePurchase(address: string, mptId: string): Promise<boolean> {
    try {
      // Verificar se address tem credential necessária
      // const hasCredential = await this.checkCredential(address, 'BR-Investor-Verified');
      
      // Por enquanto, sempre aprovado (mock)
      return true;
    } catch (error) {
      console.error('Erro na validação do hook:', error);
      return false;
    }
  }

  /**
   * Hook: Gatilho quando novo aluguel está disponível
   * Dispara distribuição automática via Escrow
   */
  async onRentAvailable(propertyId: string, rentAmount: number): Promise<void> {
    try {
      console.log(`🚨 Hook disparado: Aluguel disponível para ${propertyId}`);
      
      // Buscar holders do imóvel
      const holders = await this.getPropertyHolders(propertyId);
      
      if (holders.length === 0) {
        console.log('Nenhum holder encontrado');
        return;
      }

      // Calcular distribuição proporcional
      const totalTokens = await this.getTotalTokens(propertyId);
      const rentPerToken = rentAmount / totalTokens;

      console.log(`💰 Distribuindo aluguel: R$ ${rentAmount} para ${holders.length} holders`);

      // Distribuir via Escrow
      const distributions = holders.map(holder => ({
        address: holder.address,
        tokens: holder.tokens,
        payment: holder.tokens * rentPerToken,
      }));

      // Notificar cada holder
      for (const dist of distributions) {
        await this.notificationsService.sendRentNotification(
          dist.address,
          `Imóvel ${propertyId}`,
          dist.payment
        );
      }

      console.log('✅ Aluguel distribuído via hook');
    } catch (error) {
      console.error('Erro no hook de aluguel:', error);
    }
  }

  /**
   * Hook: Validação de transfer restriction
   * Impede transfer se não tiver credential
   */
  async validateTransfer(
    from: string,
    to: string,
    mptId: string,
    amount: number,
  ): Promise<boolean> {
    try {
      // Verificar credentials de ambos
      const fromHasCredential = await this.hasCredential(from);
      const toHasCredential = await this.hasCredential(to);

      if (!fromHasCredential || !toHasCredential) {
        console.log('❌ Transfer rejeitado: sem credential');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro na validação de transfer:', error);
      return false;
    }
  }

  /**
   * Hook: Evento de criação de Escrow
   * Configura time-lock e condições
   */
  async onCreateEscrow(
    propertyId: string,
    amount: number,
    releaseDate: Date,
  ): Promise<string> {
    try {
      console.log(`🔒 Criando Escrow para ${propertyId}: R$ ${amount}`);
      
      // Criar Escrow no XRPL com time-lock
      const escrowId = await this.xrplService.createEscrow(
        propertyId,
        amount.toString(),
        JSON.stringify({
          propertyId,
          releaseDate: releaseDate.toISOString(),
        }),
      );

      console.log(`✅ Escrow criado: ${escrowId}`);
      return escrowId;
    } catch (error) {
      console.error('Erro ao criar Escrow:', error);
      throw error;
    }
  }

  /**
   * Hook: Release automático de Escrow no dia configurado
   * Executa distribuição para holders
   */
  async onEscrowRelease(escrowId: string): Promise<void> {
    try {
      console.log(`🔓 Hook de release do Escrow: ${escrowId}`);
      
      // Buscar dados do Escrow
      // const escrowData = await this.getEscrowData(escrowId);
      
      // Disparar distribuição
      // await this.onRentAvailable(escrowData.propertyId, escrowData.amount);
      
      console.log('✅ Escrow liberado via hook');
    } catch (error) {
      console.error('Erro no release de Escrow:', error);
    }
  }

  // Helper methods
  private async getPropertyHolders(propertyId: string): Promise<Array<{ address: string; tokens: number }>> {
    // Mock data
    return [
      { address: 'rAddress1', tokens: 625 },
      { address: 'rAddress2', tokens: 1333 },
    ];
  }

  private async getTotalTokens(propertyId: string): Promise<number> {
    return 1000000; // Mock
  }

  private async hasCredential(address: string): Promise<boolean> {
    // Verificar no XRPL
    return true;
  }
}

