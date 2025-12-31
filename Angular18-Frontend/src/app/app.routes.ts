import { Routes } from '@angular/router';
import { RegisterAdminComponent } from './components/register-admin/registerAdmin.component';
import { RegisterUserComponent } from './components/register-user/registerUser.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './components/list-users/list-users.component';
import { RevokeUserComponent } from './components/revoke-user/revokeUser.component';
import { DeleteUserComponent } from './components/delete-user/deleteUser.component';
import { authGuard } from './guards/auth.guard';
import { UsersDetailsComponent } from './components/user-details/user-details.component';
import { RegisterBookComponent } from './components/register-book/registerBook.component';
import { ListBooksComponent } from './components/list-books/listBooks.component';
import { BookDetailsComponent } from './components/book-deails/book-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path:  '', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [authGuard]}, 
  { path: 'register-admin', component: RegisterAdminComponent, canActivate: [authGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [authGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [authGuard] },
  { path: 'revoke-user', component: RevokeUserComponent, canActivate: [authGuard] },
  { path: 'revoke-all', component: DeleteUserComponent, canActivate: [authGuard] },
  { path: 'delete-user', component: DeleteUserComponent, canActivate: [authGuard] },
  { path: 'user-details/:id', component: UsersDetailsComponent, canActivate: [authGuard] },
  { path: 'register-book', component: RegisterBookComponent, canActivate: [authGuard] },
  { path: 'list-books', component: ListBooksComponent},
  { path: 'book-details/:id', component: BookDetailsComponent},
];
