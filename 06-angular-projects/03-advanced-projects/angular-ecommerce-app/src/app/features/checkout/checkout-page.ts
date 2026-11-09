import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart/cart.service';
@Component({ selector: 'app-checkout-page', standalone: true, imports: [CurrencyPipe, ReactiveFormsModule, RouterLink], templateUrl: './checkout-page.html', styleUrl: './checkout-page.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class CheckoutPage {
  readonly cart = inject(CartService);
  readonly orderPlaced = signal(false);
  readonly form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] })
  });
  placeOrder(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.cart.items().length) return;
    this.orderPlaced.set(true);
    this.cart.clear();
  }
}
