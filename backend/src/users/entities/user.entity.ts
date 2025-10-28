import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  address: string; // Wallet address

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  kycVerified: boolean;

  @Column({ nullable: true })
  credentialId: string; // "BR-Investor-Verified"

  @Column('json', { nullable: true })
  kycData: {
    name?: string;
    document?: string;
    verifiedAt?: Date;
  };

  @CreateDateColumn()
  createdAt: Date;
}

