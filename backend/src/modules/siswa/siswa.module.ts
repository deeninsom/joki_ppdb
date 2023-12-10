import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SiswaController } from "./siswa.controller";
import { SiswaService } from "./siswa.service";
import Siswa from "./siswa.entity";
import Users from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Siswa, Users]),
  ],
  controllers: [SiswaController],
  providers: [SiswaService],
})
export class SiswaModule { }