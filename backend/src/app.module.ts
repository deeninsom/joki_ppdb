import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './modules/upload_data/upload.controller';
import Users from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import Siswa from './modules/siswa/siswa.entity';
import { SiswaModule } from './modules/siswa/siswa.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, cb: any) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          const fileExt = extname(file.originalname);
          return cb(null, `${randomName}${fileExt}`);
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_sistem_ppdb',
      synchronize: true,
      entities: [
        Users,
        Siswa
      ],
    }),
    AuthModule,
    UserModule,
    SiswaModule
  ],
  controllers: [UploadController]
})
export class AppModule { }
