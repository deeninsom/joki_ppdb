import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AlamatDTO {
    @ApiProperty()
    alamat: string;

    @ApiProperty()
    desa: string;

    @ApiProperty()
    kecamatan: string;

    @ApiProperty()
    kabupaten: string;

    @ApiProperty()
    provinsi: string;

    @ApiProperty()
    jarak_sekolah: string;

}

export class WaliDTO {
    @ApiProperty()
    nama_wali: string;

    @ApiProperty()
    alamat: string;

    @ApiProperty()
    jenis_pekerjaan: string;

    @ApiProperty()
    no_handphone: string;
}

export class SekolahDTO {
    @ApiProperty()
    nama_sekolah: string;

    @ApiProperty()
    jenjang_sekolah: string;
}

export class CreateSiswaDTO {
    @ApiProperty()
    nama_lengkap: string;

    @ApiProperty()
    nisn: number;

    @ApiProperty()
    tempat_lahir: string;

    @ApiProperty()
    tanggal_lahir: string;

    @ApiProperty()
    jenis_kelamin: string;

    @ApiProperty()
    agama: string;

    @ApiProperty()
    no_handphone: string;

    @ApiProperty()
    @IsOptional()
    file_rapot: string;

    @ApiProperty()
    nilai_rapot: string;

    @ApiProperty({ type: AlamatDTO })
    data_alamat: JSON;

    @ApiProperty({ type: WaliDTO })
    data_wali: JSON;

    @ApiProperty({ type: SekolahDTO })
    data_sekolah: JSON;

}

export class UpdateSiswaDTO {
    @ApiProperty()
    @IsOptional()
    nama_lengkap?: string;

    @ApiProperty()
    @IsOptional()
    nisn?: number;

    @ApiProperty()
    @IsOptional()
    nik?: number;

    @ApiProperty()
    @IsOptional()
    tempat_lahir?: string;

    @ApiProperty()
    @IsOptional()
    tanggal_lahir?: string;

    @ApiProperty()
    @IsOptional()
    jenis_kelamin?: string;

    @ApiProperty()
    @IsOptional()
    agama?: string;

    @ApiProperty()
    @IsOptional()
    no_handphone?: string;

    @ApiProperty()
    @IsOptional()
    file_raport?: string;

    @ApiProperty()
    @IsOptional()
    nilai_raport?: string;

    @ApiProperty({ type: AlamatDTO})
    @IsOptional()
    data_alamat?: JSON;

    @ApiProperty({ type: WaliDTO })
    @IsOptional()
    data_wali?: JSON;

    @ApiProperty({ type: SekolahDTO })
    @IsOptional()
    data_sekolah?: JSON;

    @ApiProperty()
    @IsOptional()
    status?: string;

}

export class QuerySiswaDto {
    @ApiProperty({
        description: 'find By user_id',
        required: false
    })
    @IsOptional()
    user_id?: string

    @ApiProperty({
        description: 'find By status',
        required: false
    })
    @IsOptional()
    status?: string

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
