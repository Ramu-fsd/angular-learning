import {Component,inject} from '@angular/core';
import {RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';
import {StoreService} from './store.service';
@Component({selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<header class="topbar"><a class="brand" routerLink="/"><span class="mark">M</span><span>MarketOps<small>COMMERCE OPERATIONS</small></span></a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/catalog" routerLinkActive="active">Catalogue</a><a routerLink="/orders" routerLinkActive="active">Orders</a><a routerLink="/returns" routerLinkActive="active">Returns</a></nav><a class="cart-link" routerLink="/cart">Cart <b>{{store.cartCount()}}</b></a><div class="user"><span class="avatar">OP</span>Operations</div></header><main class="shell"><router-outlet/></main><footer>MarketOps Commerce Workbench <span>Portfolio demo · Synthetic order data</span></footer>`})
export class AppComponent{readonly store=inject(StoreService);}
