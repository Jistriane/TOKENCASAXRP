import { Injectable } from '@nestjs/common';
import { PinataSDK } from 'pinata';

@Injectable()
export class IPFSService {
  private pinata: PinataSDK;

  constructor() {
    const apiKey = process.env.PINATA_API_KEY;
    const secretKey = process.env.PINATA_SECRET_KEY;
    
    if (apiKey && secretKey) {
      this.pinata = new PinataSDK({
        pinataJwt: secretKey,
        pinataGateway: 'gateway.pinata.cloud',
      });
    }
  }

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    try {
      if (this.pinata) {
        // Mock para desenvolvimento (Pinata SDK removido)
        console.log('Upload para IPFS (mock):', fileName);
      }
      
      // Mock para desenvolvimento
      return 'QmMock' + Date.now();
    } catch (error) {
      console.error('Erro ao fazer upload para IPFS:', error);
      return 'QmMockError' + Date.now();
    }
  }

  async uploadMetadata(metadata: any): Promise<string> {
    try {
      if (this.pinata) {
        // Mock para desenvolvimento
        console.log('Upload metadata para IPFS (mock)');
      }
      
      return 'QmMetadata' + Date.now();
    } catch (error) {
      console.error('Erro ao fazer upload de metadata:', error);
      return 'QmMetadataError' + Date.now();
    }
  }

  getFileUrl(hash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }
}

