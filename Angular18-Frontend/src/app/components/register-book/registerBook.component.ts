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
  templateUrl: './registerBook.component.html',
  styleUrl: './registerBook.component.scss',
})

export class RegisterBookComponent {
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
    private bookService: bookService,
    private toastersService: ToastersService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modifiedFormControl.setValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    this.modifiedFormControl.disable();
  }

  registerBook() {
    if (!this.isFormValid()) {
      this.toastersService.showError('Please fill all fields');
      return;
    }
    this.bookService
      .create({       
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
      //this.publishedFormControl.valid
    );
  }
}
