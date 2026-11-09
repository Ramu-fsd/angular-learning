import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoSessionService } from './demo-session.service';

export const paymentOperationsGuard: CanActivateFn = (_route, state) => {
  const session = inject(DemoSessionService);
  const router = inject(Router);

  if (session.isSignedIn()) return true;

  return router.createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url }
  });
};
