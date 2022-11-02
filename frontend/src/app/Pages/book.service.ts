import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { BookSchema } from './bookSchema';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private book?: BookSchema;
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public bookSetter(bookData: BookSchema) {
    this.book = bookData;
  }
  public bookGetter() {
    return this.book;
  }
  // ----------------
  public async creataBook(body: BookSchema): Promise<BookSchema> {
    let res = this.http.post<BookSchema>(`${this.url}/books`, body);
    let data = await lastValueFrom(res);
    return data;
  }
  public async uploadImage(imagebody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.url}/image/upload`, imagebody);
    let data = await lastValueFrom(res);
    return data['url'];
  }
  public findAllBooks(): Observable<BookSchema[]> {
    return this.http.get<BookSchema[]>(`${this.url}/books`);
  }
  public deleteBook(id: string) {
    return this.http.delete(`${this.url}/books/${id}`);
  }
  public async updateBook(
    id: string,
    bookBody: BookSchema
  ): Promise<BookSchema> {
    let res = this.http.patch<BookSchema>(`${this.url}/books/${id}`, bookBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await lastValueFrom(res);
    console.log(data);
    return data;
  }
}
