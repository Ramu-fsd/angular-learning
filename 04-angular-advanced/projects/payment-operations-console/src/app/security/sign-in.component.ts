import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoAuthService } from './demo-auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  template: `
    <section class="panel">
      <h2>Demo sign-in</h2>
      <p>This button creates an in-memory demo session only. It is not real authentication.</p>
      <button type="button" (click)="signIn()">Sign in (demo)</button>
      <button type="button" (click)="signOut()">Sign out</button>
      <p role="status">{{ message }}</p>
    </section>
  `,
  styles: [`.panel { background:white; padding:1.5rem; border:1px solid #dce2ea; border-radius:10px; display:grid; gap:1rem; max-width:550px; }`]
})
export class SignInComponent {
  private readonly auth = inject(DemoAuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  message = '';

  signIn(): void {
    this.auth.signInDemo();
    this.message = 'Demo session started.';
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/operations';
    // Only accept local application paths; do not redirect to arbitrary external URLs.
    const safeReturnUrl = returnUrl.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : '/operations';
    void this.router.navigateByUrl(safeReturnUrl);
  }

  signOut(): void {
    this.auth.signOutDemo();
    this.message = 'Demo session ended.';
    void this.router.navigateByUrl('/');
  }
}
