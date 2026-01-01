import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class BookService {
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

  create(dto: any): any {
    return this.http.post(
      environment.apiUrl + '/books',
      dto
    );
  }

  getBooks(): any {
    return this.http.get(
      environment.apiUrl + '/books'
    );
  }

  findByTitle(title: any): any {
    return this.http.get(
      environment.apiUrl + '/books/search/' + title
    );
  }

  delete(id: string): any {
    return this.http.delete(
      environment.apiUrl + '/books/' + id
    );
  }

  getBooksDetails(id: string): any {
    return this.http.get(
      environment.apiUrl +'/books/' + id
    );
  }

  updateBook(dto: any): any {
    return this.http.put(
      environment.apiUrl + '/books',
      dto
    );
  }
  
  /*
  getByEmail(email: string): any {
    return this.http.get(
      environment.apiUrl + '/authenticate/getUser/' + email
    );
  }
  
  getUserDetails(id: string): any {
    return this.http.get(
      environment.apiUrl + '/authenticate/getUserDetails/' + id
    );
  }

  getUsers(): any {
    return this.http.get(
      environment.apiUrl + '/authenticate/getUsers'
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
    */
}
