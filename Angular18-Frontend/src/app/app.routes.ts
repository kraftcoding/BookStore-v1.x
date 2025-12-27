import { Routes } from '@angular/router';
import { RegisterAdminComponent } from './components/register-admin/registerAdmin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registerAdmin', component: RegisterAdminComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: '', component: HomeComponent },
];
