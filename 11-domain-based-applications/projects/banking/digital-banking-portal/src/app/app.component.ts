import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">N</span><span>Northstar<small> DIGITAL BANKING</small></span></div>
        <nav aria-label="Main navigation">
          <a routerLink="/dashboard" routerLinkActive="active">Overview</a>
          <a routerLink="/accounts" routerLinkActive="active">Accounts</a>
          <a routerLink="/transactions" routerLinkActive="active">Transactions</a>
          <a routerLink="/beneficiaries" routerLinkActive="active">Beneficiaries</a>
          <a routerLink="/service-requests" routerLinkActive="active">Service requests</a>
        </nav>
        <div class="sidebar-note">Secure banking experience<br><small>Portfolio demonstration</small></div>
      </aside>
      <main class="content"><header class="topbar"><span>Customer portal</span><div class="profile"><span class="avatar">JL</span><span>Jordan Lee</span></div></header><router-outlet /></main>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
