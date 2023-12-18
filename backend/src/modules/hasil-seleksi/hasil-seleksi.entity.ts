import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Siswa from '../siswa/siswa.entity';

@Entity()
export default class HasilUjian {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  pdf: string;

  @ManyToOne(() => Siswa, (siswa) => siswa.id)
  @JoinColumn({ name: 'siswa_id' })
  siswa_id: string

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}