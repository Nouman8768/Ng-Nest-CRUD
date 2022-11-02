import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/Book-Store'),
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
