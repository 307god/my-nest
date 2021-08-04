import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { isEmpty, forEach } from 'lodash';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(body.name);
    console.log(file);
  }

  @Post('upload1')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile1(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    if (!body.name || files.length === 0) {
      throw new HttpException('请求参数错误', HttpStatus.FORBIDDEN);
    }
    for (const file of files) {
      const writeImage = createWriteStream(
        join(
          __dirname,
          '..',
          '..',
          'upload',
          `${body.name}-${Date.now()}-${file.originalname}`,
        ),
      );

      writeImage.write(file.buffer);
    }
  }

  @Post('upload2')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'front',
        maxCount: 1,
      },
      {
        name: 'back',
        maxCount: 1,
      },
    ]),
  )
  uploadFile2(
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Body() body,
  ) {
    if (!body.name || isEmpty(files)) {
      throw new HttpException('请求参数错误', HttpStatus.FORBIDDEN);
    }
    forEach(files, (v, k) => {
      for (const file of v) {
        const writeImage = createWriteStream(
          join(
            __dirname,
            '..',
            '..',
            'upload',
            `${body.name}-${k}-${Date.now()}-${file.originalname}`,
          ),
        );
        writeImage.write(file.buffer);
      }
    });
  }
}
