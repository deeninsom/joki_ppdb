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
export default class Nilai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  nilai_rapot: number;

  @Column({ type: 'float', nullable: true })
  nilai_ujian: number;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => Siswa, (siswa) => siswa.id)
  @JoinColumn({ name: 'siswa_id' })
  siswa_id: string

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

