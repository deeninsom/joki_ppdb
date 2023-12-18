import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { Response } from 'express';
import { CreateWebsiteDTO, UpdateWebsiteDTO } from './website.dto';

@ApiTags('websites')
@Controller('websites')
export class WebsiteController {
    constructor(private readonly websiteService: WebsiteService) { }

    @Get()
    async get(@Res() res: Response) {
        try {
            const data = await this.websiteService.get()
            return res.status(200).json({ message: "Berhasil menampilkan website", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get(':id')
    async getId(@Param('id') id: number, @Res() res: Response) {
        try {
            const data = await this.websiteService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan website", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Post()
    async create(@Body() payload: CreateWebsiteDTO, @Res() res: Response) {
        try {
            const datas: any = payload
            const data = await this.websiteService.create(datas);
            return res.status(200).json({ message: "Berhasil menambahkan website", data });
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
    async update(@Param('id') id: number, @Body() payload: UpdateWebsiteDTO, @Res() res: Response) {
        try {
            const data = await this.websiteService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui website", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        try {
            await this.websiteService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus website", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}