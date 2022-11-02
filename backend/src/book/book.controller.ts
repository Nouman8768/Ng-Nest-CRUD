import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, bookDocument, UpdateBookDto } from './book_schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  async createBook(@Body() book: Book) {
    const createdBook = await this.bookService.createBook(book);
    return createdBook;
  }
  @Get()
  async findAllBooks() {
    return this.bookService.findAllBooks();
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    await this.bookService.deleteBook(id);
    console.log('The Book with id', id, 'is Deleted from DataBase');
  }
  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() bookBody: UpdateBookDto) {
    const book = await this.bookService.getById(id);
    console.log('Book', book);

    if (book) {
      await this.bookService.updateBook(id, bookBody);
      console.log('The Book with id', id, 'is Updated in DataBase');

      console.log('BookBody', bookBody);
    } else {
      throw new NotFoundException('BOOK NOT FOUND');
    }
  }
}
