import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoAuthService } from './demo-auth.service';

export const demoAuthGuard: CanActivateFn = (_route, state) => {
  const auth = inject(DemoAuthService);
  const router = inject(Router);

  if (auth.isSignedIn()) return true;

  return router.createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url }
  });
};
