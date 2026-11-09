import {Component,inject} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {StoreService} from '../store.service';
@Component({standalone:true,imports:[CurrencyPipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">CHECKOUT</p><h1>Your cart</h1><p class="muted">Review quantities before placing a sample order.</p></div><a class="secondary" routerLink="/catalog">Continue shopping</a></section>
<section class="detail-grid"><article class="panel"><h2>Cart items · {{store.cartCount()}}</h2>@for(line of store.cart();track line.productId){@if(product(line.productId);as p){<div class="cart-item"><div class="product-thumb">{{p.category==='Electronics'?'◈':p.category==='Fashion'?'◇':'⌂'}}</div><div class="cart-info"><strong>{{p.name}}</strong><small>{{p.sku}}</small><b>{{p.price|currency:'INR':'symbol':'1.0-0'}}</b></div><div class="quantity"><button (click)="store.setQuantity(p.id,line.quantity-1)">−</button><span>{{line.quantity}}</span><button (click)="store.setQuantity(p.id,line.quantity+1)" [disabled]="line.quantity>=p.stock">+</button></div><strong>{{p.price*line.quantity|currency:'INR':'symbol':'1.0-0'}}</strong></div>}}@if(store.cart().length===0){<div class="empty">Your cart is empty. <a routerLink="/catalog" class="link">Browse products</a></div>}</article>
<article class="panel"><h2>Order summary</h2><div class="summary-line"><span>Subtotal</span><b>{{store.cartTotal()|currency:'INR':'symbol':'1.0-0'}}</b></div><div class="summary-line"><span>Shipping</span><b>Calculated later</b></div><div class="summary-line total"><span>Demo total</span><b>{{store.cartTotal()|currency:'INR':'symbol':'1.0-0'}}</b></div><button class="primary full" [disabled]="store.cartCount()===0" (click)="placeOrder()">Place sample order</button><p class="fine-print">No payment is collected. This action creates a local sample order only.</p></article></section>`})
export class CartComponent{
 readonly store=inject(StoreService);private router=inject(Router);
 product(id:string){return this.store.products().find(p=>p.id===id);}
 placeOrder(){const id=this.store.placeOrder();if(id)this.router.navigate(['/orders',id]);}
}
