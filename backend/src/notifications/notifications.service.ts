import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private sendgrid = null;

  constructor() {
    const sendgridKey = process.env.SENDGRID_API_KEY;
    if (sendgridKey) {
      // Import dinâmico do SendGrid
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(sendgridKey);
        this.sendgrid = sgMail;
      } catch (error) {
        console.log('SendGrid não instalado');
      }
    }
  }

  async sendEmail(to: string, subject: string, content: string) {
    try {
      if (!this.sendgrid) {
        console.log('SendGrid não configurado. Email simulado:', { to, subject });
        return { success: true, simulated: true };
      }

      const msg = {
        to,
        from: process.env.SENDGRID_FROM || 'noreply@tokencasa.com',
        subject,
        html: content,
      };

      await this.sendgrid.send(msg);
      console.log('Email enviado:', to);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, error };
    }
  }

  async sendRentNotification(to: string, propertyName: string, amount: number) {
    const subject = '💰 Aluguel Recebido - TokenCasa';
    const content = `
      <h1>Você recebeu aluguel! 🎉</h1>
      <p>Propriedade: ${propertyName}</p>
      <p>Valor: R$ ${amount.toFixed(2)}</p>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">Ver detalhes no TokenCasa</a></p>
    `;
    
    return this.sendEmail(to, subject, content);
  }

  async sendTransactionNotification(to: string, txType: string, amount: number) {
    const subject = `✅ Transação ${txType} - TokenCasa`;
    const content = `
      <h1>Transação ${txType}</h1>
      <p>Valor: R$ ${amount.toFixed(2)}</p>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/transactions">Ver histórico</a></p>
    `;
    
    return this.sendEmail(to, subject, content);
  }
}
