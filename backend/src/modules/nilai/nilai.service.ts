import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Nilai from './nilai.entity';

@Injectable()
export class NilaiService {
    constructor(
        @InjectRepository(Nilai)
        private nilaiRepository: Repository<Nilai>,
    ) { }

    async get(siswa_id: string, status_seleksi: any, status_verifikasi: any, date: any, kode_pendaftaran: string, pages: number, limits: number) {

        let queryBuilder = this.nilaiRepository.createQueryBuilder('nilai') 

        if (siswa_id) {
            queryBuilder = queryBuilder.where('nilai.siswa_id LIKE :siswa_id', { siswa_id: `%${siswa_id}%` });
        }

        if (status_seleksi) {
            queryBuilder = queryBuilder.where('nilai.status LIKE :status', { status: `%${status_seleksi}%` });
        }

        if (status_verifikasi) {
            queryBuilder = queryBuilder.where('siswa.status LIKE :status', { status: `%${status_verifikasi}%` });
        }

        if (date) {
            queryBuilder = queryBuilder.where('nilai.created_at LIKE :date', { date: `%${date}%` });
        }

        if (kode_pendaftaran) {
            queryBuilder = queryBuilder.where('siswa.kode_pendaftaran LIKE :kode_pendaftaran', { kode_pendaftaran: `%${kode_pendaftaran}%` });
        }

        if (pages <= 0) {
            pages = 1;
        }

        const [data, totalData] = await queryBuilder
            .leftJoinAndSelect('nilai.siswa_id', 'siswa')
            .skip((pages - 1) * limits)
            .take(limits)
            .orderBy('nilai.created_at', 'ASC')
            .getManyAndCount();

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
        const findNilai = await this.nilaiRepository.findOne({
            where: { id },
            relations: ['siswa_id'],
        });
        if (!findNilai) throw new HttpException(`Nilai dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findNilai
    }

    async create(nilaiDTO: any): Promise<any> {
        const createSiswa = await this.nilaiRepository.save(nilaiDTO);
        return createSiswa
    }

    async update(id: string, payload: any): Promise<any> {
        const findNilai = await this.getId(id)

        if (!findNilai) throw new HttpException(`Nilai dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.nilaiRepository.update(findNilai.id, payload)
        return await this.nilaiRepository.findOne({ where: { id: findNilai.id } })
    }

    async delete(id: string): Promise<void> {
        const findNilai = await this.getId(id)
        await this.nilaiRepository.delete(findNilai.id)
    }

}
