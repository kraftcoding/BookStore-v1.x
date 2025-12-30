import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastersService } from 'src/app/services/toasters.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
      if(this.userService.isAuthenticated()){
        this.toastersService.showSuccess('You are already loged');
        this.router.navigate(['/home']); 
      }        
    }


  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private toastersService: ToastersService,
    private router: Router
  ) {}

  login(): void {
    let dto: any = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      rememberMe: this.rememberMe,
    };

    this.userService.login(dto).subscribe(
      (response: any) => {
        console.log(response);
        let token: any = jwtDecode(response.Token);
        this.userService.setIsAuthenticated(true, response.Email);
        this.userService.setJwtToken(response);
        this.userService.setUserRoles(response);
        this.toastersService.showSuccess('Login successful');
        localStorage.setItem('Template_isReloaded', 'false');
        this.router.navigate(['/home']);       
      },
      (error: any) => {
        this.toastersService.handleError(error);
        console.log(error);
      }
    );
  }
}
