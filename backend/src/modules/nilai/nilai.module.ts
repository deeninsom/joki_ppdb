import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NilaiController } from "./nilai.controller";
import { NilaiService } from "./nilai.service";
import Siswa from "./nilai.entity";
import Nilai from "./nilai.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Siswa, Nilai]),
  ],
  controllers: [NilaiController],
  providers: [NilaiService],
})
export class NilaiModule { }