import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  // Demonstration state only. Replace with a properly designed OIDC/session integration.
  private readonly authenticated = signal(false);

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  setDemoAuthenticated(value: boolean): void {
    this.authenticated.set(value);
  }
}
