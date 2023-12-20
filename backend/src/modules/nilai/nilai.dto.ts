import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNilaiDTO {

    @ApiProperty()
    nilai_rapot: number;

    @ApiProperty()
    nilai_ujian: number;

    @ApiProperty()
    siswa_id: string;

}

export class PostId{
    @ApiProperty()
    siswa_id: string;
}

export class UpdateNilaiDTO {

    @ApiProperty()
    @IsOptional()
    nilai_rapot: number;

    @ApiProperty()
    @IsOptional()
    nilai_ujian: number;

    @ApiProperty()
    @IsOptional()
    status?: string;

}

export class QueryNilaiDto {
    @ApiProperty({
        description: 'find By siswa_id',
        required: false
    })
    @IsOptional()
    siswa_id?: string

    @ApiProperty({
        description: 'find By status verifikasi',
        required: false
    })
    @IsOptional()
    status_verifikasi?: string

    @ApiProperty({
        description: 'find By status seleksi',
        required: false
    })
    @IsOptional()
    status_seleksi?: string

    @ApiProperty({
        description: 'find By kode pendaftaran',
        required: false
    })
    @IsOptional()
    kode_pendaftaran?: string

    @ApiProperty({
        description: 'find By date',
        required: false
    })
    @IsOptional()
    filterDate?: string

    @ApiProperty({
        description: 'Set page',
        required: true
    })
    @IsOptional()
    page?: number;

    @ApiProperty({
        description: 'Set limit',
        required: true
    })
    @IsOptional()
    limit?: number;
}
