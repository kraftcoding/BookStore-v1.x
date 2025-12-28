import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { ToastersService } from 'src/app/services/toasters.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn$ = this.userService.isAuthenticated$;  
  isAdmin$ = this.userService.isAdmin$;  
  username$ = this.userService.username$;
  username: any;  
  

  constructor(
    private router: Router,
    private userService: UserService,
    private toastersService: ToastersService
  ) {}

  ngOnInit() {    
    this.username$.subscribe((response) => {
      this.username = signal<string>(response || '');
    });
    this.username = signal<string>(
      localStorage.getItem('Template_email') || ''
    );
    
    // this.isAdmin = signal<string>(
    //   localStorage.getItem('Template_roles')?.includes("Admin") ? "true" : "false"
    //);
    // if (!this.username) {
    //   this.username = signal<string>(
    //     localStorage.getItem('Template_email') || ''
    //   );
    // }
  }

  loginRedirect() {
    this.router.navigate(['/login']);
  }

  registerAdmin() {
    this.router.navigate(['/register-admin']);
  }

  registerUser() {
    this.router.navigate(['/register-user']);
  }

  revokeUser() {
    this.router.navigate(['/revoke-user']);
  }

  revokeAll() {
    //this.router.navigate(['/revoke-all']);
    this.userService
      .revokeAll({ 
        subjects: [],
      })
      .subscribe(
        (response: any) => {
          this.router.navigate(['/']);
          this.toastersService.showSuccess('Successfully revoked (all)');
        },
        (error: any) => {
          this.toastersService.handleError(error);
        }
      );
  }

  deleteUser() {
    this.router.navigate(['/delete-user']);
  }

  editUser() {
    this.router.navigate(['/edit-user']);
  }

  logout() {
    this.userService.setIsAuthenticated(false);
    this.userService.clearJwtToken();
    this.router.navigate(['/']);
  }

  homeRedirect() {
    this.router.navigate(['/']);
  }
}
