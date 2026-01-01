import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ListUser } from 'src/app/models/ListUser.model';
import { ToastersService } from 'src/app/services/toasters.service';
import { UserService } from 'src/app/services/user.service';

import {MatTableModule} from '@angular/material/table'
//import {SelectionModel} from '@angular/cdk/collections'
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-list-users',
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
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})



export class UsersComponent {
 
  ListUsers: ListUser[]; 

  //initialSelection = [];
  //allowMultiSelect = true;
  //selection = new SelectionModel<ListUser>(this.allowMultiSelect, this.initialSelection);

  constructor(
    private userService: UserService,
    private toastersService: ToastersService,   
    private router: Router
  ) {}

  gotoDetails(id: string){
    this.router.navigate(['/user-details/' + id]);
  }

  ngOnInit() {    
    this.userService
      .getUsers()
      .subscribe(
        (response: any) => {
          this.ListUsers = response;
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

}
