import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Siswa from './siswa.entity';
import Users from '../user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SiswaService {
    constructor(
        @InjectRepository(Siswa)
        private siswaRepository: Repository<Siswa>,

        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async get() {
        const findSiswa = await this.siswaRepository.find()
        return findSiswa
    }

    async getId(id: string): Promise<any> {
        const findSiswa = await this.siswaRepository.findOne({
            where: { id }
        });
        if (!findSiswa) throw new HttpException(`Siswa dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findSiswa
    }

    async create(siswaDTO: any): Promise<any> {

        const createSiswa = await this.siswaRepository.save(siswaDTO);
        const payload = await this.getId(createSiswa.id)

        // create user from siswa
        await this.createUser(`${payload.nisn}`, `${payload.nisn}`)

        return createSiswa
    }

    async update(id: string, payload: any): Promise<any> {
        const findSiswa = await this.getId(id)

        await this.siswaRepository.save(payload)
        return await this.siswaRepository.findOne({ where: { id: findSiswa.id } })
    }

    async delete(id: string): Promise<void> {
        const findSiswa = await this.getId(id)
        await this.siswaRepository.delete(findSiswa.id)
    }

    private async createUser(username: string, password: string) {
        const createUser = {
            username: `${username}`,
            password: `${password}`,
            role: "siswa"
        }

        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        createUser.password = hashedPassword;

        await this.userRepository.save(createUser)
    }
}
