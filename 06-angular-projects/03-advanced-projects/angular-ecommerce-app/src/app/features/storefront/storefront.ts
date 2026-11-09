import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { STORE_PRODUCTS } from '../products/store-products';
@Component({ selector: 'app-storefront', standalone: true, imports: [CurrencyPipe], templateUrl: './storefront.html', styleUrl: './storefront.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class Storefront {
  readonly cart = inject(CartService);
  readonly products = STORE_PRODUCTS;
  readonly category = signal('All');
  readonly categories = ['All', 'Accessories', 'Home', 'Workspace', 'Stationery'];
  setCategory(value: string): void { this.category.set(value); }
  get visibleProducts() { return this.products.filter(product => this.category() === 'All' || product.category === this.category()); }
}
