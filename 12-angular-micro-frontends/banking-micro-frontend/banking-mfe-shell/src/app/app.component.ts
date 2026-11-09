import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/">
          <span class="brand-symbol">N</span>
          <span><strong>Northstar</strong><small>BANKING PLATFORM</small></span>
        </a>
        <div class="nav-caption">PLATFORM</div>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><span>▦</span> Overview</a>
          <a routerLink="/accounts" routerLinkActive="active"><span>▤</span> Accounts <i>REMOTE</i></a>
          <a routerLink="/payments" routerLinkActive="active"><span>⇄</span> Payments <i>REMOTE</i></a>
          <a routerLink="/customers" routerLinkActive="active"><span>♙</span> Customers <i>REMOTE</i></a>
          <a routerLink="/admin" routerLinkActive="active"><span>⚙</span> Administration <i>REMOTE</i></a>
        </nav>
        <div class="sidebar-bottom"><div class="secure"><span>●</span> Secure workspace</div><div class="user"><div class="user-avatar">RB</div><div><b>Ramu Boya</b><small>Platform Administrator</small></div></div></div>
      </aside>
      <main class="main">
        <header class="topbar"><div class="crumb">Northstar / <b>Banking platform</b></div><div class="top-actions"><span class="environment">DEVELOPMENT</span><span class="notification">♧</span><div class="top-avatar">RB</div></div></header>
        <router-outlet />
        <footer>Northstar Banking Platform <span>Micro frontend shell · Angular 20</span></footer>
      </main>
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.app-shell{min-height:100vh;display:flex}.sidebar{width:252px;background:#10233b;color:#eaf0f7;padding:25px 17px 18px;display:flex;flex-direction:column;flex-shrink:0}.brand{display:flex;gap:11px;align-items:center;text-decoration:none;color:#fff;margin:0 0 43px 5px}.brand-symbol{width:37px;height:37px;border-radius:11px;background:#2d76c7;display:grid;place-items:center;font-size:19px;font-weight:800}.brand strong,.brand small{display:block}.brand strong{font-size:15px;letter-spacing:.2px}.brand small{font-size:8px;letter-spacing:1.5px;color:#91a7c0;margin-top:4px}.nav-caption{font-size:9px;letter-spacing:1.6px;color:#8298b2;margin:0 0 12px 10px}nav{display:grid;gap:5px}nav a{height:42px;padding:0 10px;display:flex;align-items:center;gap:12px;text-decoration:none;color:#b8c7d9;font-size:12px;border-radius:7px}nav a>span{width:17px;text-align:center;font-size:15px}nav a.active,nav a:hover{background:#213c5c;color:#fff}nav a i{margin-left:auto;font-size:7px;font-style:normal;letter-spacing:.7px;color:#86a8ce;border:1px solid #3c5878;padding:3px 4px;border-radius:3px}.sidebar-bottom{margin-top:auto}.secure{font-size:10px;color:#a7c8b4;background:#183a3a;padding:10px;border-radius:6px;margin-bottom:18px}.secure span{color:#56c58a;margin-right:7px}.user{border-top:1px solid #2b405a;padding:17px 2px 0;display:flex;align-items:center;gap:10px}.user-avatar,.top-avatar{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#dceaff;color:#275b96;font-size:10px;font-weight:700}.user b,.user small{display:block}.user b{font-size:10px}.user small{font-size:9px;color:#9eb0c5;margin-top:4px}.main{flex:1;min-width:0;display:flex;flex-direction:column}.topbar{height:61px;background:#fff;border-bottom:1px solid #e8edf2;padding:0 31px;display:flex;align-items:center;justify-content:space-between}.crumb{font-size:11px;color:#98a3b1}.crumb b{color:#3a4c63}.top-actions{display:flex;align-items:center;gap:17px}.environment{font-size:8px;letter-spacing:1px;font-weight:700;color:#3675b9;background:#edf5ff;padding:6px 8px;border-radius:4px}.notification{color:#71839a}.top-avatar{width:29px;height:29px}footer{margin-top:auto;padding:17px 31px;color:#a1acba;font-size:9px;border-top:1px solid #e9edf2;background:#fff}footer span{float:right}@media(max-width:760px){.sidebar{width:67px;padding:20px 8px}.brand{margin:0 0 35px;justify-content:center}.brand>span:last-child,.nav-caption,nav a{font-size:0}.brand-symbol{flex-shrink:0}nav a{justify-content:center;padding:0}nav a>span{font-size:17px}nav a i,.sidebar-bottom .secure,.user>div:last-child{display:none}.user{justify-content:center}.topbar{padding:0 14px}.crumb{font-size:9px}footer{padding:14px}.environment{display:none}}
  `]
})
export class AppComponent {}
