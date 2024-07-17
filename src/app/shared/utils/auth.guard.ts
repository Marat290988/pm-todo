import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.getUser()) {
    return true;
  }
  return router.parseUrl('/auth');
};

export const authUserRedirector = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.getUser() === null) {
    return true;
  }
  return router.parseUrl('');
}