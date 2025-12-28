import { Routes } from '@angular/router';
import { RegisterAdminComponent } from './components/register-admin/registerAdmin.component';
import { RegisterUserComponent } from './components/register-user/registerUser.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path:  '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'register-admin', component: RegisterAdminComponent, canActivate: [authGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [authGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [authGuard] },

];
