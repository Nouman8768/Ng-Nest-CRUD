import { PartialType } from '@nestjs/mapped-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  name?: string;
  @Prop({ required: true })
  author?: string;
  @Prop({ required: true })
  price?: number;
  @Prop({ required: true })
  image?: string;
}
export const bookSchema = SchemaFactory.createForClass(Book);
export type bookDocument = Book & Document;
//Following line is for select perticular fields from schema both for create and update,using swagger
export class UpdateBookDto extends PartialType(Book) {}
