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
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';

import {MatTableModule} from '@angular/material/table'
//import {SelectionModel} from '@angular/cdk/collections'
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { MatIcon } from "@angular/material/icon";

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
    MatPaginatorModule,
    MatIcon
],
  providers: [DatePipe],
  templateUrl: './listBooks.component.html',
  styleUrl: './listBooks.component.scss',
})

export class ListBooksComponent {

  ListBook: Book[]; 
  isAdmin$ = this.userService.isAdmin$;  
  isLoggedIn$ = this.userService.isAuthenticated$;  

  constructor(
    private bookService: BookService,
    private toastersService: ToastersService,
    private datePipe: DatePipe,
    private router: Router,
    private userService: UserService,
  ) {}

 gotoDetails(id: string){
    this.router.navigate(['book-details/' + id]);
  }

  editDetails(id: string){
    this.router.navigate(['edit-book/' + id]);
  }

  deleteBook(id: string){
    this.bookService
      .delete(id)
      .subscribe(
        (response: any) => {
          window.location.reload();
          this.toastersService.showSuccess('Successfully deleted');
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
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
