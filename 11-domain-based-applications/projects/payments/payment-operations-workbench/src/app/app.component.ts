import { Component, inject } from '@angular/core';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
import { PaymentDataService } from './core/payment-data.service';
@Component({selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<div class="layout"><aside><div class="brand"><span>◎</span><div>Northstar<small>PAYMENT OPERATIONS</small></div></div><nav><a routerLink="/dashboard" routerLinkActive="active">Overview</a><a routerLink="/payments" routerLinkActive="active">Payment queue</a><a routerLink="/payments/new" routerLinkActive="active">Create payment</a></nav><div class="side-note">Operations workspace<br><small>Training environment</small></div></aside>
<main><header><span>Payment operations</span><label>Demo operator <select [value]="data.currentOperator()" (change)="data.currentOperator.set($any($event.target).value)"><option value="ops.alex">Alex (ops.alex)</option><option value="ops.jordan">Jordan (ops.jordan)</option></select></label></header><router-outlet/></main></div>`,styleUrl:'./app.component.css'})
export class AppComponent{readonly data=inject(PaymentDataService);}
