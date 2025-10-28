import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('bigint')
  totalTokens: number;

  @Column('decimal', { precision: 10, scale: 6 })
  pricePerToken: number;

  @Column('decimal', { precision: 5, scale: 2 })
  yieldAnnual: number;

  @Column()
  type: string; // 'residencial' | 'comercial'

  @Column('int')
  area: number;

  @Column('text')
  description: string;

  @Column('json')
  images: string[];

  @Column('json', { nullable: true })
  documents: {
    matricula?: string;
    iptu?: string;
    contrato?: string;
    laudo?: string;
  };

  @Column({ nullable: true })
  ipfsMetadataHash: string;

  @Column({ nullable: true })
  mptId: string;

  @Column()
  ownerAddress: string;

  @Column('boolean', { default: false })
  tokenized: boolean;

  @Column('bigint', { default: 0 })
  tokensSold: number;

  @Column('json', { nullable: true })
  rentalHistory: Array<{
    month: string;
    amount: number;
    distributed: boolean;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
