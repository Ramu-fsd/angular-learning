import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/">SENTINEL<span> / FRAUD OPS</span></a>
      <nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/alerts" routerLinkActive="active">Alert queue</a></nav>
      <div class="analyst"><span class="online"></span> Alex Morgan · Analyst</div>
    </header>
    <main><router-outlet /></main>
    <footer>Fraud Operations Workbench · Synthetic portfolio data · Not for production decisions</footer>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f4f6fa;color:#18243a;font-family:Inter,Arial,sans-serif}
    .topbar{height:64px;background:#101d33;color:#fff;display:flex;align-items:center;padding:0 5%;gap:42px}
    .brand{font-weight:800;letter-spacing:1px;color:#fff;text-decoration:none;font-size:14px}.brand span{color:#9eb2d4;font-size:10px}
    nav{display:flex;gap:24px;flex:1}nav a{color:#b7c4d9;text-decoration:none;font-size:12px;padding:24px 0}nav a.active{color:#fff;border-bottom:2px solid #7da8ff}
    .analyst{font-size:11px;color:#d5deeb}.online{display:inline-block;width:7px;height:7px;border-radius:50%;background:#45c58a;margin-right:7px}
    main{max-width:1250px;margin:auto;padding:28px 24px}footer{text-align:center;color:#8a96a8;font-size:10px;padding:22px}
    @media(max-width:650px){.topbar{padding:0 14px;gap:14px}.analyst{display:none}nav{justify-content:flex-end;gap:14px}main{padding:18px 12px}}
  `]
})
export class AppComponent {}
