/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HasilUjian from './hasil-seleksi.entity';

@Injectable()
export class HasilUjianService {
    constructor(
        @InjectRepository(HasilUjian)
        private hasilUJianRepository: Repository<HasilUjian>,
    ) { }

    async get() {
        const result = await this.hasilUJianRepository.find();
        return result
    }

    async getId(id: string): Promise<any> {
        const findWebsite = await this.hasilUJianRepository.findOne({
            where: {
                id: id
            }
        });
        if (!findWebsite) throw new HttpException(`Hasil Ujian dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findWebsite
    }

    async create(payload: any): Promise<any> {
        const kuota: any = this.hasilUJianRepository.create(payload)
        const createKuota = await this.hasilUJianRepository.save(kuota);
        return createKuota
    }

    async update(id: string, payload: any): Promise<any> {
        const findWebsite = await this.hasilUJianRepository.findOne({
            where: {
                id: id
            }
        });
        if (!findWebsite) throw new HttpException(`Hasil Ujian dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.hasilUJianRepository.update(findWebsite.id, payload)
        return await this.hasilUJianRepository.findOne({ where: { id: findWebsite.id } })
    }

    async delete(id: string): Promise<void> {
        const findWebsite = await this.hasilUJianRepository.findOne({
            where: { 
                id: id 
            }
        });
        if (!findWebsite) throw new HttpException(`Hasil Ujian dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.hasilUJianRepository.delete(findWebsite)
    }
}