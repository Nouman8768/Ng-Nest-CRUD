import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookSchema } from '../bookSchema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: BookService, private route: Router) {}
  res?: BookSchema[] = [];
  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.service.findAllBooks().subscribe((data: BookSchema[]) => {
      this.res = data;
      console.log('@GET Resppnse', this.res);
    });
  }
  deleteBook(bookid: BookSchema) {
    this.service.deleteBook(bookid._id!).subscribe((data) => {
      console.log('Deleted Book', data);
      this.findAllBooks();
    });
  }
  sendDataToUpdateForm(data: BookSchema) {
    this.service.bookSetter(data);
    this.route.navigate(['/updatebook']);
  }
}
