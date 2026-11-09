import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './features/cart/cart.service';
@Component({ selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink], templateUrl: './app.html', styleUrl: './app.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {
  constructor(readonly cart: CartService) {}
}
