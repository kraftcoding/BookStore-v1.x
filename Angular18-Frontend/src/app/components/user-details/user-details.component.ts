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
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/models/UserDetails.model';
import { ToastersService } from 'src/app/services/toasters.service';
import { UserService } from 'src/app/services/user.service';

import {MatTableModule} from '@angular/material/table'
//import {SelectionModel} from '@angular/cdk/collections'
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-user-details',
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
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})

export class UsersDetailsComponent {
 
  UserDetails: UserDetails; 

  constructor(
    private userService: UserService,
    private toastersService: ToastersService,   
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {  
    this.getUserDetails(this.route.snapshot.params['id']);      
  }

  getUserDetails(id: string): void {
    this.userService.getUserDetails(id).subscribe(
        (response: any) => {
          this.UserDetails = response;
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

}
