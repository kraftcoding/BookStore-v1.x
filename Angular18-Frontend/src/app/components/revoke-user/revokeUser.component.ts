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
import { UserService } from 'src/app/services/user.service';
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
  templateUrl: './revokeUser.component.html',
  styleUrl: './revokeUser.component.scss',
})

export class RevokeUserComponent {
  usernameFormControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private userService: UserService,
    private toastersService: ToastersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  revokeUser() {
    if (!this.isFormValid()) {
      this.toastersService.showError('Please fill all fields');
      return;
    }
    this.userService
      .revokeUser({                
        email: this.emailFormControl.value,     
        subjects: [],
      })
      .subscribe(
        (response: any) => {
          this.router.navigate(['/']);
          this.toastersService.showSuccess('Successfully revoked');
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

  isFormValid() {
    return (
      this.emailFormControl.valid
    );
  }
}
