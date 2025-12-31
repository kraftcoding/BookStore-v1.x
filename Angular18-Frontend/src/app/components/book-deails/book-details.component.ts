import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ToastersService } from 'src/app/services/toasters.service';
import { BookService } from 'src/app/services/book.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  providers: [DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})

export class BookDetailsComponent {

  Book: Book; 

  constructor(
    private bookService: BookService,
    private toastersService: ToastersService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBookDetails(this.route.snapshot.params['id']); 
  }

  getBookDetails(id: string): void {
    this.bookService.getBooksDetails(id).subscribe(
        (response: any) => {
          this.Book = response;
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }
}
