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
    jarak_sekolah: string;

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
    nik: number;

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
    file_raport: string;

    @ApiProperty()
    nilai_raport: string;

    @ApiProperty({ type: [AlamatDTO] })
    data_alamat: JSON;

    @ApiProperty({ type: [WaliDTO] })
    data_wali: JSON;

    @ApiProperty({ type: [SekolahDTO] })
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

    @ApiProperty({ type: [AlamatDTO] })
    @IsOptional()
    data_alamat?: JSON;

    @ApiProperty({ type: [WaliDTO] })
    @IsOptional()
    data_wali?: JSON;

    @ApiProperty({ type: [SekolahDTO] })
    @IsOptional()
    data_sekolah?: JSON;
}
