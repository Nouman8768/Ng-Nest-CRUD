import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  static url: string;
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/',
        filename: (req, file, cb) => {
          const filename: string = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${filename}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.imageUrl(file);
  }
  private imageUrl(file: Express.Multer.File) {
    // ImageController.url = `./assets/${file.filename}`;
    //With upper line "./assets" will also be added in your url and you have to replace that at frontend then.
    ImageController.url = `${file.filename}`;
    return { url: ImageController.url.toString() };
  }
}
