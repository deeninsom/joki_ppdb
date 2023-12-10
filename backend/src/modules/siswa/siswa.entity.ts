import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Siswa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode_pendaftaran: string;

  @Column({ nullable: true })
  nama_lengkap: string;

  @Column({ nullable: true })
  nisn: number;

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
  file_raport: string;

  @Column({ nullable: true })
  nilai_raport: string;

  @Column({ type: 'json', nullable: true })
  data_alamat: JSON;

  @Column({ type: 'json', nullable: true })
  data_wali: JSON;

  @Column({ type: 'json', nullable: true })
  data_sekolah: JSON;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

