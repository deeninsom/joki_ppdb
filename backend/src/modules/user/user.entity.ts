import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import Siswa from '../siswa/siswa.entity';
import Nilai from '../nilai/nilai.entity';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, default: "siswa" })
  role: string;

  @OneToMany(()=> Siswa, (siswa)=> siswa.user_id, {
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

