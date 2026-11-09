import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';
@Component({ selector: 'app-cart-page', standalone: true, imports: [CurrencyPipe, RouterLink], templateUrl: './cart-page.html', styleUrl: './cart-page.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class CartPage { readonly cart = inject(CartService); }
