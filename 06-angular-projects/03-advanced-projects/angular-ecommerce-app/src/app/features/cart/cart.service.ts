import { Injectable, computed, signal } from '@angular/core';
import { CartLine, StoreProduct } from '../products/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartLine[]>([]);
  readonly items = this._items.asReadonly();
  readonly itemCount = computed(() => this._items().reduce((sum, line) => sum + line.quantity, 0));
  readonly subtotal = computed(() => this._items().reduce((sum, line) => sum + line.product.price * line.quantity, 0));

  add(product: StoreProduct): void {
    this._items.update(lines => {
      const existing = lines.find(line => line.product.id === product.id);
      return existing
        ? lines.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...lines, { product, quantity: 1 }];
    });
  }
  changeQuantity(id: number, quantity: number): void {
    this._items.update(lines => quantity <= 0 ? lines.filter(line => line.product.id !== id) :
      lines.map(line => line.product.id === id ? { ...line, quantity: Math.min(99, quantity) } : line));
  }
  remove(id: number): void { this._items.update(lines => lines.filter(line => line.product.id !== id)); }
  clear(): void { this._items.set([]); }
}
