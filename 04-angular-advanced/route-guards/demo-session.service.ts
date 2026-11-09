import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoSessionService {
  private readonly signedIn = signal(false);

  isSignedIn(): boolean {
    return this.signedIn();
  }

  signInForDemo(): void {
    this.signedIn.set(true);
  }

  signOutForDemo(): void {
    this.signedIn.set(false);
  }
}
