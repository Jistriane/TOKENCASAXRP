import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(address: string) {
    return this.usersRepository.findOne({ where: { address } });
  }

  async createOrUpdate(userData: Partial<User>) {
    let user = await this.findOne(userData.address);
    
    if (!user) {
      user = this.usersRepository.create(userData);
    } else {
      Object.assign(user, userData);
    }
    
    return this.usersRepository.save(user);
  }

  async verifyKYC(kycData: any) {
    console.log('Verificando KYC:', kycData);
    
    // Em produção, integraria com Fractal ID ou outro provider
    const user = await this.createOrUpdate({
      address: kycData.address,
      email: kycData.email,
      kycVerified: true,
      credentialId: 'BR-Investor-Verified',
      kycData: {
        name: kycData.name,
        document: kycData.document,
        verifiedAt: new Date(),
      },
    });
    
    return {
      verified: true,
      credential: 'BR-Investor-Verified',
      address: user.address,
      user,
      timestamp: new Date(),
    };
  }

  async hasCredential(address: string, credentialId: string): Promise<boolean> {
    const user = await this.findOne(address);
    return user?.credentialId === credentialId;
  }
}

