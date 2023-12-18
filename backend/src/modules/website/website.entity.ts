import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Websites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  status_pendaftaran: boolean;

  @Column({ type: 'text', nullable: true })
  pengumuman_umum: string;

  @Column({ type: 'text', nullable: true })
  pengumuman_ujian: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}