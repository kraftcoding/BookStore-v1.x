import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('Template_email')) {
      this.isAuthenticatedSubject.next(true);
    }
    if(localStorage.getItem('Template_roles')?.includes("Admin") ? true : false){
      this.isAdminSubject.next(true);
    }
  }

  setIsAuthenticated(isAuthenticated: boolean, email?: string) {
    if (email) {
      localStorage.setItem('Template_email', email);
      this.usernameSubject.next(email);
    } else {
      localStorage.removeItem('Template_email');
      this.usernameSubject.next('');
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  isAuthenticated() {
    if(this.isAuthenticatedSubject.value){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }    
  }

  setUserRoles(request: any) {
    localStorage.setItem('Template_roles', request.Roles);    
  }

  setJwtToken(request: any) {
    localStorage.setItem('Template_jwt', request.Token);
    localStorage.setItem('Template_refreshToken', request.RefreshToken);
  }

  clearJwtToken() {
    localStorage.removeItem('Template_jwt');
    localStorage.removeItem('Template_refreshToken');
  }

  login(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/authenticate/login',
      dto
    );
  }

  logout(): any {
    return this.http.post(
      environment.apiUrl +
        '/authenticate/LogoutUser/' +
        localStorage.getItem('Template_email'),
      {}
    );
  }

  getByEmail(email: string): any {
    return this.http.get(
      environment.apiUrl + '/authenticate/getUser/' + email
    );
  }

  registerUser(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/authenticate/registerUser',
      dto
    );
  }

   registerAdmin(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/authenticate/registerAdmin',
      dto
    );
  }

  getRefreshToken(dto: any) {
    return this.http.post(
      environment.apiUrl + '/authenticate/refresh-token',
      dto
    );
  }

  updateUser(dto: any): any {
    return this.http.put(
      environment.apiUrl + '/authenticate/UpdateUser',
      dto
    );
  }

  revokeUser(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/authenticate/revoke/' + dto.email ,
      dto
    );
  }

  revokeAll(dto: any) {
    return this.http.post(
      environment.apiUrl + '/authenticate/revoke-all',
      dto
    );
  }

  deleteUser(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/authenticate/delete/' + dto.email ,
      dto
    );
  }
}
