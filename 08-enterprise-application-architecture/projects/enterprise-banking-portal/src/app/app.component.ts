import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">N</span><span>NORTHSTAR<br><small>BANKING PLATFORM</small></span></div>
        <p class="nav-label">WORKSPACE</p>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">▦ <span>Overview</span></a>
          <a routerLink="/customers" routerLinkActive="active">♙ <span>Customers</span></a>
          <a routerLink="/payments" routerLinkActive="active">⇄ <span>Payments</span></a>
        </nav>
        <div class="sidebar-bottom">Enterprise architecture demo<br><small>Angular standalone · Lazy routes</small></div>
      </aside>
      <main class="main">
        <header class="topbar"><span>Digital Banking / <strong>Workspace</strong></span><span class="user">RB&nbsp; Ramu Boya</span></header>
        <div class="content"><router-outlet /></div>
      </main>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
