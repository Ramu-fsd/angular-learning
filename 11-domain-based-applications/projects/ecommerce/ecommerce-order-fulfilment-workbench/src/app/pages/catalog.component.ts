import {Component,computed,inject,signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {StoreService} from '../store.service';
@Component({standalone:true,imports:[CurrencyPipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">PRODUCT MANAGEMENT</p><h1>Product catalogue</h1><p class="muted">Browse products and add available items to your demo cart.</p></div><a class="secondary" routerLink="/cart">View cart · {{store.cartCount()}}</a></section>
<div class="filters"><input placeholder="Search products or SKU..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="category()" (change)="category.set($any($event.target).value)"><option>All categories</option><option>Electronics</option><option>Home & Living</option><option>Fashion</option></select></div>
<section class="product-grid">@for(p of filtered();track p.id){<article class="product"><div class="product-art"><span>{{p.category==='Electronics'?'◈':p.category==='Fashion'?'◇':'⌂'}}</span>@if(p.badge){<b>{{p.badge}}</b>}</div><div class="product-body"><small>{{p.category}} · {{p.sku}}</small><h2>{{p.name}}</h2><p>{{p.description}}</p><div class="product-foot"><strong>{{p.price|currency:'INR':'symbol':'1.0-0'}}</strong><span>★ {{p.rating}}</span></div><div class="stock">{{p.stock>0?p.stock+' units available':'Out of stock'}}</div><button class="primary full" (click)="store.addToCart(p.id)" [disabled]="p.stock===0">Add to cart</button></div></article>}</section>
@if(filtered().length===0){<p class="empty">No products match your search.</p>}`})
export class CatalogComponent{
 readonly store=inject(StoreService);readonly query=signal('');readonly category=signal('All categories');
 readonly filtered=computed(()=>{const q=this.query().toLowerCase();return this.store.products().filter(p=>(this.category()==='All categories'||p.category===this.category())&&[p.name,p.sku,p.description].some(v=>v.toLowerCase().includes(q)));});
}
