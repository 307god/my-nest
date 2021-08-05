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
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { isEmpty, map } from 'lodash';

@Controller('file')
export class FileController {
  // 上传单个文件
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { path: file.path };
  }

  // 上传文件数组
  @Post('upload1')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile1(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    if (!body.name || files.length === 0) {
      throw new HttpException('请求参数错误', HttpStatus.FORBIDDEN);
    }
    return map(files, (file) => {
      return { path: file.path };
    });
  }

  // 上传多个文件
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
    return map(files, (v, k) => {
      for (const file of v) {
        return { path: file.path };
      }
    });
  }

  // 上传任何文件
  @Post('upload3')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile3(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    if (!body.name || isEmpty(files)) {
      throw new HttpException('请求参数错误', HttpStatus.FORBIDDEN);
    }
    return map(files, (file) => {
      return { path: file.path };
    });
  }
}
