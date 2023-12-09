import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('upload')
export class UploadController {

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join(__dirname, '../../../uploads', filename);
        return res.sendFile(filePath);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file, @Req() req: Request) {
        const host = req.get('host');
        const url = `${req.protocol}://${host}/api/v1/upload/${file.filename}`;
        return {data: {url, file} };
    }
}
