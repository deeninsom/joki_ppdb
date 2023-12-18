import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

    async get(user_id: string, status: any, date: any, kode_pendaftaran: string, pages: number, limits: number) {
        const whereCondition: any = {}

        if (user_id) {
            whereCondition.user_id = Like(`%${user_id}%`)
        }

        if (status) {
            whereCondition.status = Like(`%${status}%`)
        }

        if (date) {
            whereCondition.created_at = Like(`%${date}%`)
        }

        if (kode_pendaftaran) { 
            whereCondition.kode_pendaftaran = Like(`%${kode_pendaftaran}%`)
        }

        if (pages <= 0) {
            pages = 1;
          }

        const [data, totalData]  = await this.siswaRepository.findAndCount({
            where: whereCondition,
            relations: ['user_id'],
            skip: (pages - 1) * limits,
            take: limits,
            order: {created_at: 'ASC'}
        })

        const totalPages = Math.ceil(totalData / limits);

        return {
            data: data || [],
            totalData,
            pages,
            limits,
            totalPages,
        };
    }

    async getId(id: string): Promise<any> {
        const findSiswa = await this.siswaRepository.findOne({
            where: { id },
            relations: ['user_id']
        });
        if (!findSiswa) throw new HttpException(`Siswa dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findSiswa
    }

    async create(siswaDTO: any): Promise<any> {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        
        const lastNumber = await this.getLastRegisterNumber()
        const newCodeRegister = `#${formattedDate}${lastNumber}`

        siswaDTO.kode_pendaftaran = newCodeRegister
        const createSiswa = await this.siswaRepository.save(siswaDTO);
        const payload = await this.getId(createSiswa.id)

        // create user from siswa
        const user = await this.createUser(`${payload.nisn}`, `${payload.nisn}`)

        //update_user_id
        payload.user_id = user.id
        await this.siswaRepository.update(payload.id, payload)

        return createSiswa
    }

    async update(id: string, payload: any): Promise<any> {
        const findSiswa = await this.getId(id)

        await this.siswaRepository.update(findSiswa.id, payload)
        return await this.siswaRepository.findOne({ where: { id: findSiswa.id } })
    }

    async delete(id: string): Promise<void> {
        const findSiswa = await this.getId(id)

        console.log(findSiswa.user_id.id)
        const deleteSiswa = await this.siswaRepository.delete(findSiswa.id)
        // const deleteUser = await this.userRepository.findOne({
        //     where: {
        //         id: findSiswa.user_id.id
        //     }
        // })

        // console.log(deleteUser)
        // if(deleteSiswa){
        //     await this.userRepository.delete(deleteUser.id)
        // }

    }

    private async createUser(username: string, password: string) {
        const createUser = {
            username: `${username}`,
            password: `${password}`,
            role: "siswa"
        }

        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        createUser.password = hashedPassword;


        const save = await this.userRepository.save(createUser)
        return save
    }

    async getLastRegisterNumber() {
        try {
          const lastSiswa = await this.siswaRepository.find({
            order: { kode_pendaftaran: 'DESC' },
            take: 1,
          });
      
          let nextNumber = 1;
      
          if (lastSiswa && lastSiswa.length > 0 && lastSiswa[0].kode_pendaftaran) {
            const lastCode = lastSiswa[0].kode_pendaftaran;
            const lastNumber = parseInt(lastCode.substr(lastCode.length - 1), 10);
            if (!isNaN(lastNumber)) {
              nextNumber = lastNumber + 1;
            }
          }

          return nextNumber;
        } catch (error) {
          return 0; 
        }
      }
      
      
}
