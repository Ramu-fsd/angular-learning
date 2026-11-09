import { Routes } from '@angular/router';
import { Storefront } from './features/storefront/storefront';
import { CartPage } from './features/cart/cart-page';
import { CheckoutPage } from './features/checkout/checkout-page';
export const routes: Routes = [
  { path: '', component: Storefront },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: CheckoutPage },
  { path: '**', redirectTo: '' }
];
