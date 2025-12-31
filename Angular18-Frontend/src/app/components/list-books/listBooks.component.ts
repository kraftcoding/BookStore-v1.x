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
import { bookService } from 'src/app/services/book.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';

import {MatTableModule} from '@angular/material/table'
//import {SelectionModel} from '@angular/cdk/collections'
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [DatePipe],
  templateUrl: './listBooks.component.html',
  styleUrl: './listBooks.component.scss',
})

export class ListBooksComponent {

  ListBook: Book[]; 

  constructor(
    private bookService: bookService,
    private toastersService: ToastersService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

 gotoDetails(id: string){
    this.router.navigate(['book-details/' + id]);
  }

  deleteBook(id: string){
    console.log();
  }

  ngOnInit() {    
    this.bookService
      .getBooks()
      .subscribe(
        (response: any) => {
          this.ListBook = response;
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }
}
