import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiswaService } from './siswa.service';
import { Response } from 'express';
import { CreateSiswaDTO, UpdateSiswaDTO } from './siswa.dto';

@ApiTags('siswa')
@Controller('siswa')
export class SiswaController {
    constructor(private readonly siswaService: SiswaService) { }

    @Get()
    async get(@Res() res: Response) {
        try {
            const data = await this.siswaService.get()
            return res.status(200).json({ message: "Berhasil menampilkan siswa", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get(':id')
    async getId(@Param('id') id: string, @Res() res: Response) {
        try {
            const data = await this.siswaService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan siswa", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Post()
    async create(@Body() payload: CreateSiswaDTO, @Res() res: Response) {
        try {
            const data = await this.siswaService.create(payload);
            return res.status(200).json({ message: "Berhasil menambahkan siswa", data });
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: UpdateSiswaDTO, @Res() res: Response) {
        try {
            const data = await this.siswaService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui siswa", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.siswaService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus siswa", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
