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
import { Router, ActivatedRoute } from '@angular/router';
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
  templateUrl: './editBook.component.html',
  styleUrl: './editBook.component.scss',
})

export class EditBookComponent {

  Book: Book; 

  titleFormControl = new FormControl('', Validators.required);
  authorsFormControl = new FormControl('');  
  seriesFormControl = new FormControl('');
  idsFormControl = new FormControl('');
  categoryFormControl = new FormControl('');
  publishedFormControl = new FormControl('');
  publisherFormControl = new FormControl('');
  languagesFormControl = new FormControl('');
  tagsFormControl = new FormControl('');
  formatsFormControl = new FormControl('');
  modifiedFormControl = new FormControl(''); 

  constructor(
    private bookService: BookService,
    private toastersService: ToastersService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initBookDetails(this.route.snapshot.params['id']);
  }

  initBookDetails(id: string): void {
    this.bookService.getBooksDetails(id).subscribe(
        (response: any) => {
          this.Book = response;
          this.titleFormControl.setValue(this.Book.Title);
          this.authorsFormControl.setValue(this.Book.Authors ?  this.Book.Authors : '');
          this.idsFormControl.setValue(this.Book.Ids ?  this.Book.Ids : '');
          this.categoryFormControl.setValue(this.Book.Category ?  this.Book.Category : '');
          this.seriesFormControl.setValue(this.Book.Series ?  this.Book.Series.toString() : '0');
          this.publishedFormControl.setValue(this.datePipe.transform(new Date(this.Book.Published ? this.Book.Published.toString() : ''), 'yyyy-MM-dd')); 
          this.publisherFormControl.setValue(this.Book.Publisher ?  this.Book.Publisher.toString() : '');
          this.languagesFormControl.setValue(this.Book.Languages ?  this.Book.Languages.toString() : '');
          this.tagsFormControl.setValue(this.Book.Tags ?  this.Book.Tags.toString() : '');
          this.formatsFormControl.setValue(this.Book.Formats ?  this.Book.Formats.toString() : '');
          this.modifiedFormControl.setValue(this.datePipe.transform(new Date(this.Book.Modified), 'yyyy-MM-dd'));          
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

  updateBook() {
    if (!this.isFormValid()) {
      this.toastersService.showError('Please fill all fields');
      return;
    }
    this.bookService
      .updateBook({     
        id: this.Book.Id,
        modified:  this.modifiedFormControl.value,   
        title: this.titleFormControl.value,
        ids: this.idsFormControl.value,
        category: this.categoryFormControl.value,
        authors: this.authorsFormControl.value,
        series: this.seriesFormControl.value,
        published: this.datePipe.transform(
         this.publishedFormControl.value,
         'yyyy-MM-dd'
        ),
        publisher: this.publisherFormControl.value,
        languages: this.languagesFormControl.value,
        tags: this.tagsFormControl.value,
        formats: this.formatsFormControl.value,
        subjects: [],
      })
      .subscribe(
        (response: any) => {
          this.router.navigate(['/list-books']);
          this.toastersService.showSuccess('Successfully created');
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

  isFormValid() {
    return (
      this.titleFormControl.valid 
    );
  }
}
