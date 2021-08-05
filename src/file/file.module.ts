import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { FileController } from './file.controller';
import * as nuid from 'nuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 自定义路径
        destination: function (req, file, callback) {
          callback(null, `./public/uploads/${dayjs().format('YYYY-MM-DD')}`);
        },
        filename: function (req, file, callback) {
          callback(
            null,
            `${file.fieldname}-${nuid.next()}.${file.mimetype.split('/')[1]}`,
          );
        },
      }),
      limits: {
        files: 20,
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
