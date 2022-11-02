import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookSchema } from '../bookSchema';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss'],
})
export class AddbookComponent implements OnInit {
  selectedImage?: string;
  book!: BookSchema;
  file!: File;
  constructor(private service: BookService, private route: Router) {}
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}

  async submitform() {
    await this.submitImage();

    await this.createBook();

    await this.route.navigate(['']);
  }
  async createBook() {
    this.book = await this.service.creataBook(this.bookForm.value);
  }
  async submitImage() {
    if (this.selectedImage != undefined) {
      const formdata = new FormData();
      formdata.append('file', this.file);
      const uploadedImage = await this.service.uploadImage(formdata);

      console.log('Uploaded Image resposne from Server:', uploadedImage);
      this.bookForm.value.image = uploadedImage;
    }
  }
  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    this.bookForm.patchValue({ image: this.file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.bookForm.get('image')?.updateValueAndValidity();
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
