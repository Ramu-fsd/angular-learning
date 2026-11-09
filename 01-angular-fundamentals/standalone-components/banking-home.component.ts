import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header>
      <h1>Northstar Digital Banking</h1>
      <nav aria-label="Main navigation">
        <a routerLink="/">Home</a>
        <a routerLink="/accounts">Accounts</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `
})
export class BankingHomeComponent {}
