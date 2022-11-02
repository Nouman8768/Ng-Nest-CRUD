import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookSchema } from '../bookSchema';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.scss'],
})
export class UpdatebookComponent implements OnInit {
  constructor(
    private service: BookService,
    private route: Router,
    private http: HttpClient
  ) {}
  bookForm!: FormGroup;
  selectedImage!: string;
  file!: File;

  ngOnInit(): void {
    const bookData = this.service.bookGetter();
    this.bookForm = new FormGroup({
      _id: new FormControl(bookData?._id),
      name: new FormControl(bookData?.name, [Validators.required]),
      author: new FormControl(bookData?.author, [Validators.required]),
      price: new FormControl(bookData?.price, [Validators.required]),
      image: new FormControl(bookData?.image, [Validators.required]),
    });
  }
  async submitform() {
    await this.submitImage();
    await this.submitUpdateBookForm();
    await this.route.navigate(['']);
  }
  async submitUpdateBookForm() {
    const response = await this.service.updateBook(
      this.bookForm.value._id,
      this.bookForm.value
    );
    console.log('Response', response);
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formdata = new FormData();
      formdata.append('file', this.file);

      const uploadedimage = await this.service.uploadImage(formdata);
      console.log('URL', uploadedimage);
      this.bookForm.value.image = uploadedimage;
    }
  }
  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
