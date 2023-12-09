import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import Users from "../user/user.entity"
import { Repository } from "typeorm"
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "./auth.dto"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async Login(loginDto: LoginDto): Promise<{
        id: string;
        username: string;
        role: string;
    }> {
        const { username, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (!user)
            throw new HttpException('Username tidak ditemukan !', HttpStatus.NOT_FOUND);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            throw new HttpException(
                'Password tidak cocok !',
                HttpStatus.UNAUTHORIZED,
            );

        return {
            id: user.id,
            username: user.username,
            role: user.role,
        };
    }

    // async getId(id: string): Promise<UserDTO> {
    //     const findUser = await this.userRepository.findOne({
    //         where: { id }
    //     });
    //     if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
    //     return findUser
    // }

    // async create(userDTO: UserDTO): Promise<any> {
    //     const createKuota = await this.userRepository.save(userDTO);
    //     return createKuota
    // }

    // async update(id: string, payload: any): Promise<UserDTO> {
    //     const findUser = await this.userRepository.findOne({
    //         where: { id }
    //     });
    //     if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

    //     await this.userRepository.save(payload)
    //     return await this.userRepository.findOne({ where: { id: findUser.id } })
    // }

    // async delete(id: string): Promise<void> {
    //     const findUser = await this.userRepository.findOne({
    //         where: { id: id }
    //     });
    //     if (!findUser) throw new HttpException(`User dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

    //     await this.userRepository.delete(findUser)
    // }
}