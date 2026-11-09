import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header><a routerLink="/" class="brand">NEXUS <span>LENDING OPERATIONS</span></a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Loan pipeline</a></nav><span class="operator">● Jordan Lee · Underwriter</span></header>
    <main><router-outlet /></main>
    <footer>Lending Origination Workbench · Synthetic portfolio data · Not a credit decision engine</footer>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f4f6fa;color:#1b2940;font-family:Arial,sans-serif}
    header{height:64px;background:#14233a;color:white;display:flex;align-items:center;padding:0 5%;gap:42px}
    .brand{color:white;text-decoration:none;font-size:14px;font-weight:800;letter-spacing:1px}.brand span{font-size:9px;color:#aabbd2;margin-left:8px}
    nav{flex:1}nav a{color:#d3dceb;text-decoration:none;font-size:12px;padding:24px 0}.active{border-bottom:2px solid #8bb5ff}
    .operator{font-size:10px;color:#d3dceb}main{max-width:1250px;margin:auto;padding:28px 24px}
    footer{text-align:center;color:#8a96a8;font-size:10px;padding:22px}
    @media(max-width:650px){header{padding:0 14px;gap:12px}.operator{display:none}main{padding:18px 12px}}
  `]
})
export class AppComponent {}
