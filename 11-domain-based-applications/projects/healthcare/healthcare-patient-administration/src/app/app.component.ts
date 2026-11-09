import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
@Component({selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<header class="topbar"><a class="brand" routerLink="/"><span class="mark">+</span><span>CareFlow<small>PATIENT ADMINISTRATION</small></span></a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/patients" routerLinkActive="active">Patients</a><a routerLink="/appointments" routerLinkActive="active">Appointments</a><a routerLink="/billing" routerLinkActive="active">Billing</a></nav><div class="user"><span class="avatar">JD</span><span>Jordan Davis<small>Front Office Admin</small></span></div></header>
<main class="shell"><router-outlet /></main><footer>CareFlow Patient Administration <span>Portfolio demo · Fictional patient data</span></footer>`})
export class AppComponent {}
