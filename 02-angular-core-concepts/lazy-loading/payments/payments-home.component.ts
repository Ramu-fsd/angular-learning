import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payments-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Payments</h1>
    <p>Payment initiation, tracking, and exception management.</p>
    <a routerLink="review">Open payment review</a>
  `
})
export class PaymentsHomeComponent {}
