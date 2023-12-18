import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebsiteController } from "./hasil-seleksi.controller";
import HasilUjian from "./hasil-seleksi.entity";
import { HasilUjianService } from "./hasil-seleksi.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([HasilUjian]),
  ],
  controllers: [WebsiteController],
  providers: [HasilUjianService],
})
export class WebsiteModule { }