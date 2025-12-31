import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { Book } from 'src/app/models/Book.model';
import { BookService } from 'src/app/services/book.service';
import { ToastersService } from 'src/app/services/toasters.service';
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
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FormatDatePipe,  FormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
  titleHome: any = 'Book Store';
  date: any = new Date();
  isReloaded: any;
  Book?: Book[];
  titleFormControl = new FormControl('', Validators.required);

   constructor(
     
      private toastersService: ToastersService,
      private router: Router,
    ) {}
 
  ngOnInit() {    
        this.isReloaded = localStorage.getItem('Template_isReloaded')
      if(this.isReloaded == 'false') this.reloadPage();
  }

  reloadPage(){
    localStorage.setItem('Template_isReloaded', 'true');
    window.location.reload();
  }

  searchBookByTitle(): void {
   
     if (!this.isFormValid()) {
      this.toastersService.showError('Please fill all fields');
      return;
    }
     this.router.navigate(['listsearch-book/' + this.titleFormControl.value]);
  }

  isFormValid() {
    return (
      this.titleFormControl.valid
    );
  }

}
