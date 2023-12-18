import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import Users from '../user/user.entity';
import Nilai from '../nilai/nilai.entity';

@Entity()
export default class Siswa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode_pendaftaran: string;

  @Column({ nullable: true })
  nama_lengkap: string;

  @Column({ nullable: true })
  nisn: string;

  @Column({ nullable: true })
  nik: number;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ nullable: true })
  tanggal_lahir: string;

  @Column({ nullable: true })
  jenis_kelamin: string;

  @Column({ nullable: true })
  agama: string;

  @Column({ nullable: true })
  no_handphone: string;

  @Column({ nullable: true })
  file_rapot: string;

  @Column({ nullable: true })
  nilai_rapot: string;

  @Column({ type: 'json', nullable: true })
  data_alamat: JSON;

  @Column({ type: 'json', nullable: true })
  data_wali: JSON;

  @Column({ type: 'json', nullable: true })
  data_sekolah: JSON;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(()=> Users, (user)=> user.id)
  @JoinColumn({name: 'user_id'})
  user_id: string

  @OneToMany(()=> Nilai, (siswa)=> siswa.siswa_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true
  })
  siswa: Siswa[]

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

