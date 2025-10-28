import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string; // XRPL transaction hash

  @Column()
  type: string; // 'buy' | 'sell' | 'rent' | 'transfer'

  @Column()
  propertyId: string;

  @Column()
  fromAddress: string;

  @Column({ nullable: true })
  toAddress: string;

  @Column('decimal', { precision: 18, scale: 0 })
  tokens: number;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column('decimal', { precision: 10, scale: 6 })
  pricePerToken: number;

  @Column({ default: 'confirmed' })
  status: string; // 'confirmed' | 'pending' | 'failed'

  @Column('json', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  timestamp: Date;
}

