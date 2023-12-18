import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebsiteController } from "./website.controller";
import { WebsiteService } from "./website.service";
import Websites from "./website.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Websites]),
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule { }