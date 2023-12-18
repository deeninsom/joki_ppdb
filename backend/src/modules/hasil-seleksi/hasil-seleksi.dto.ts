import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWebsiteDTO {
    @ApiProperty()
    status_pendaftaran: boolean;
}

export class UpdateWebsiteDTO {
    @ApiProperty()
    @IsOptional()
    status_pendaftaran: boolean;

    @ApiProperty()
    @IsOptional()
    pengumuman: string

}