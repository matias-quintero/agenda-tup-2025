import { inject } from '@angular/core';
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { auth } from '../services/auth';

export const onlyUserGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(auth)
  const router = inject(Router);
  if(!authService.token){
    const redirecPath = router.parseUrl("/login")
    return new RedirectCommand(redirecPath, {
      skipLocationChange:true
    });
  }
  return true;
};
