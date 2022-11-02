import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { bookSchema, Book } from './book_schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: bookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
