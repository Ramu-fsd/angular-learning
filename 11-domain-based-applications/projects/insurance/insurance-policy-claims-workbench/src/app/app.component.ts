import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/"><span class="brand-mark">I</span><span>InsureOps<small>POLICY & CLAIMS</small></span></a>
      <nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/policies" routerLinkActive="active">Policies</a><a routerLink="/claims" routerLinkActive="active">Claims</a></nav>
      <div class="user"><span class="avatar">AM</span><span>Alex Morgan<small>Claims Operations</small></span></div>
    </header>
    <main class="shell"><router-outlet /></main>
    <footer>Insurance Operations Workbench <span>Learning demo · Synthetic data only</span></footer>
  `
})
export class AppComponent {}
