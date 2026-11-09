import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoAuthService {
  private readonly signedIn = signal(false);

  isSignedIn(): boolean {
    return this.signedIn();
  }

  signInDemo(): void {
    this.signedIn.set(true);
  }

  signOutDemo(): void {
    this.signedIn.set(false);
  }
}
