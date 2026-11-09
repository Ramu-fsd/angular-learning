import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DemoAuthService } from './security/demo-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <div>
        <h1>Northstar Payments</h1>
        <p>Payment operations console · synthetic learning data</p>
      </div>
      <nav aria-label="Primary navigation">
        <a routerLink="/">Payment queue</a>
        <a routerLink="/operations">Operations</a>
        <a routerLink="/sign-in">Demo sign-in</a>
      </nav>
      <span class="session-state">
        {{ auth.isSignedIn() ? 'Demo session active' : 'Signed out' }}
      </span>
    </header>
    <main class="page-shell">
      <router-outlet />
    </main>
  `,
  styles: [`
    .site-header {
      display: flex; flex-wrap: wrap; gap: 1rem;
      align-items: center; justify-content: space-between;
      padding: 1rem 2rem; background: #10233f; color: white;
    }
    h1 { margin: 0; font-size: 1.35rem; }
    .site-header p { margin: .25rem 0 0; color: #cbd5e1; }
    nav { display: flex; gap: 1rem; }
    nav a { color: white; }
    .session-state { font-size: .85rem; color: #dbeafe; }
    .page-shell { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; }
  `]
})
export class AppComponent {
  readonly auth = inject(DemoAuthService);
}
