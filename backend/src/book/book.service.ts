import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageController } from 'src/image/image.controller';
import { Book, bookDocument, UpdateBookDto } from './book_schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<bookDocument>,
  ) {}
  async createBook(body: Book): Promise<Book> {
    body.image = ImageController.url;
    return await this.bookModel.create(body);
  }
  async findAllBooks() {
    return this.bookModel.find();
  }
  async deleteBook(id: string) {
    const book = await this.bookModel.findById(id);
    if (book) {
      const deleted = await this.bookModel.deleteOne({ _id: id });
      return deleted;
    }
  }
  async updateBook(id: string, bookbody: UpdateBookDto): Promise<bookDocument> {
    return await this.bookModel.findByIdAndUpdate(id, bookbody, { new: true });
  }
  async getById(id: string): Promise<bookDocument> {
    return await this.bookModel.findById(id);
  }
}
