import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);  
  return authService.isAuthenticated();
};
