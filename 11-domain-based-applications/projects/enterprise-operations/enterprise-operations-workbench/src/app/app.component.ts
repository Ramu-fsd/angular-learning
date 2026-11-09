import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">O</span><div><strong>OpsCentral</strong><small>ENTERPRISE SERVICES</small></div></div>
        <div class="nav-label">WORKSPACE</div>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">▦ &nbsp; Overview</a>
        <a routerLink="/work" routerLinkActive="active">☷ &nbsp; Work queue</a>
        <a routerLink="/work/new" routerLinkActive="active">＋ &nbsp; Create work item</a>
        <div class="sidebar-note"><strong>Operations workspace</strong><p>Coordinate service delivery, manage incidents, and keep business operations moving.</p></div>
        <div class="profile"><div class="avatar">RB</div><div><strong>Ramu Boya</strong><small>Operations Lead</small></div></div>
      </aside>
      <main class="main"><header class="topbar"><span>Enterprise Operations / <b>Work management</b></span><span class="env">DEMO ENVIRONMENT</span></header><router-outlet /></main>
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.shell{display:flex;min-height:100vh}.sidebar{width:248px;background:#142238;color:#e8eef7;padding:25px 18px;display:flex;flex-direction:column;flex-shrink:0}.brand{display:flex;align-items:center;gap:11px;margin:0 0 42px 5px}.brand-mark{display:grid;place-items:center;background:#3978d8;border-radius:10px;width:36px;height:36px;font-weight:800}.brand strong,.brand small,.profile strong,.profile small{display:block}.brand small,.profile small{font-size:10px;color:#9eafc5;letter-spacing:1px;margin-top:4px}.nav-label{font-size:10px;color:#8193aa;letter-spacing:1.5px;margin:0 0 12px 9px}.sidebar>a{color:#c3cfdd;text-decoration:none;padding:12px 11px;border-radius:8px;margin-bottom:5px;font-size:13px}.sidebar>a.active,.sidebar>a:hover{background:#263b58;color:white}.sidebar-note{margin-top:38px;background:#1c304b;border:1px solid #2d4564;padding:14px;border-radius:10px;font-size:12px}.sidebar-note p{color:#aebdd0;line-height:1.6;margin-bottom:0}.profile{margin-top:auto;border-top:1px solid #30425b;padding:18px 3px 0;display:flex;align-items:center;gap:10px;font-size:12px}.avatar{background:#dbeafe;color:#1e4c86;border-radius:50%;width:34px;height:34px;display:grid;place-items:center;font-weight:700}.main{flex:1;min-width:0}.topbar{height:62px;background:#fff;border-bottom:1px solid #e5eaf0;display:flex;align-items:center;justify-content:space-between;padding:0 34px;color:#8490a0;font-size:12px}.topbar b{color:#344258}.env{background:#edf5ff;color:#3266a8;padding:6px 9px;border-radius:5px;font-size:9px;font-weight:700;letter-spacing:1px}@media(max-width:760px){.sidebar{width:68px;padding:18px 9px}.brand{margin:0 0 35px}.brand>div,.nav-label,.sidebar>a,.sidebar-note,.profile>div:not(.avatar){display:none}.sidebar>a{display:block;font-size:0;text-align:center}.sidebar>a:first-of-type:after{content:'▦';font-size:18px}.sidebar>a:nth-of-type(2):after{content:'☷';font-size:18px}.sidebar>a:nth-of-type(3):after{content:'＋';font-size:18px}.profile{justify-content:center}.topbar{padding:0 15px}}
  `]
})
export class AppComponent {}
