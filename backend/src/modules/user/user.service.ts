import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import Users from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async get() {
        const findUser = await this.userRepository.find()
        return findUser
    }

    async getId(id: string): Promise<UserDTO> {
        const findUser = await this.userRepository.findOne({
            where: { id }
        });
        if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findUser
    }

    async create(userDTO: UserDTO): Promise<any> {
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        userDTO.password = hashedPassword;
        const createKuota = await this.userRepository.save(userDTO);
        return createKuota
    }

    async update(id: string, payload: any): Promise<UserDTO> {
        const findUser = await this.userRepository.findOne({
            where: { id }
        });
        if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.userRepository.save(payload)
        return await this.userRepository.findOne({ where: { id: findUser.id } })
    }

    async delete(id: string): Promise<void> {
        const findUser = await this.userRepository.findOne({
            where: { id: id }
        });
        if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.userRepository.delete(findUser)
    }
}
