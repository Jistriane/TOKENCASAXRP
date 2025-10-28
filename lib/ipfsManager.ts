/**
 * Integração com IPFS para armazenamento de documentos e imagens
 * Storage descentralizado para metadata dos imóveis
 */

export interface IPFSUploadResult {
  hash: string;
  url: string;
  size: number;
}

export class IPFSManager {
  private gateway = 'https://ipfs.io/ipfs/';
  private pinata = process.env.NEXT_PUBLIC_PINATA_API_KEY;

  /**
   * Upload de imagem para IPFS
   */
  async uploadImage(file: File): Promise<IPFSUploadResult> {
    try {
      // Em produção, usar Pinata ou outro serviço
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': this.pinata || '',
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET || '',
        },
        body: formData,
      });

      const data = await response.json();
      
      return {
        hash: data.IpfsHash,
        url: `${this.gateway}${data.IpfsHash}`,
        size: file.size,
      };
    } catch (error) {
      console.error('Erro ao fazer upload para IPFS:', error);
      
      // Mock para desenvolvimento
      return {
        hash: 'QmMock' + Date.now(),
        url: 'https://via.placeholder.com/800',
        size: file.size,
      };
    }
  }

  /**
   * Upload de documento (PDF)
   */
  async uploadDocument(file: File, metadata?: any): Promise<IPFSUploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      formData.append('pinataMetadata', JSON.stringify(metadata));
    }

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': this.pinata || '',
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET || '',
        },
        body: formData,
      });

      const data = await response.json();
      
      return {
        hash: data.IpfsHash,
        url: `${this.gateway}${data.IpfsHash}`,
        size: file.size,
      };
    } catch (error) {
      console.error('Erro ao fazer upload de documento:', error);
      return {
        hash: 'QmMockDoc' + Date.now(),
        url: 'https://via.placeholder.com/800',
        size: file.size,
      };
    }
  }

  /**
   * Busca arquivo do IPFS por hash
   */
  getFileUrl(hash: string): string {
    return `${this.gateway}${hash}`;
  }

  /**
   * Upload de metadata JSON
   */
  async uploadMetadata(metadata: any): Promise<string> {
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.pinata || '',
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET || '',
        },
        body: JSON.stringify({ pinataContent: metadata }),
      });

      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.error('Erro ao fazer upload de metadata:', error);
      return 'QmMockMetadata' + Date.now();
    }
  }

  /**
   * Verifica pin status
   */
  async checkPin(hash: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.pinata.cloud/data/pinList?hashes[]=${hash}`, {
        headers: {
          'pinata_api_key': this.pinata || '',
        },
      });

      const data = await response.json();
      return data.count > 0;
    } catch {
      return false;
    }
  }
}

export const ipfsManager = new IPFSManager();

