import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateNilaiDTO, UpdateNilaiDTO, QueryNilaiDto } from './nilai.dto';
import { NilaiService } from './nilai.service';

@ApiTags('nilai')
@Controller('nilai')
export class NilaiController {
    constructor(private readonly siswaService: NilaiService) { }

    @Get()
    async get(@Query() query: QueryNilaiDto, @Res() res: Response) {
        const { siswa_id, status_seleksi, status_verifikasi, filterDate, kode_pendaftaran, page, limit } = query;

        try {
            const {
                data,
                totalData,
                pages,
                limits,
                totalPages,
            } = await this.siswaService.get(siswa_id, status_seleksi, status_verifikasi, filterDate, kode_pendaftaran, page, limit);

            return res.status(200).json({ message: "Berhasil menampilkan nilai", data, totalData, pages, limits, totalPages })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get('generate-excel')
    async generateExcel ( @Res() res: Response){
        try {
            const data = await this.siswaService.generateExcel();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=HASIL SELEKSI.xlsx');

            res.send(data);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
    
    @Get(':id')
    async getId(@Param('id') id: string, @Res() res: Response) {
        try {
            const data = await this.siswaService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan nilai", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Post()
    async create(@Body() payload: CreateNilaiDTO, @Res() res: Response) {
        try {
            const data = await this.siswaService.create(payload);
            return res.status(200).json({ message: "Berhasil menambahkan nilai", data });
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
    async update(@Param('id') id: string, @Body() payload: UpdateNilaiDTO, @Res() res: Response) {
        try {
            const data = await this.siswaService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui nilai", data })
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
            return res.status(200).json({ message: "Berhasil menghapus nilai", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get('generate-pdf/:id')
    async generatePdf (@Param('id') payload: string, @Res() res: Response){
        try {
            const data = await this.siswaService.generatepdf(payload);
            res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=HASIL SELEKSI.pdf');
            res.setHeader('Content-Disposition', 'inline; filename=HASIL SELEKSI.pdf');

            res.send(data);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }


}
