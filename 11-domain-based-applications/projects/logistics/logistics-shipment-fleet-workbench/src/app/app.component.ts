import {Component} from '@angular/core';
import {RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';
@Component({selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<header class="topbar"><a class="brand" routerLink="/"><span class="mark">F</span><span>FleetPulse<small>LOGISTICS CONTROL TOWER</small></span></a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/shipments" routerLinkActive="active">Shipments</a><a routerLink="/fleet" routerLinkActive="active">Fleet</a><a routerLink="/exceptions" routerLinkActive="active">Exceptions</a></nav><div class="user"><span class="avatar">DO</span><span>Dispatch Operations<small>Control Tower</small></span></div></header><main class="shell"><router-outlet/></main><footer>FleetPulse Logistics Workbench <span>Portfolio demo · Synthetic logistics data</span></footer>`})
export class AppComponent{}
