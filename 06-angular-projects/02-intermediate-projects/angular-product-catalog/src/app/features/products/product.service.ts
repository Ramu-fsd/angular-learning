import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Studio Headphones', category: 'Audio', price: 129, description: 'Comfortable over-ear headphones for focused listening.', color: '#e9e5ff' },
  { id: 2, name: 'Portable Speaker', category: 'Audio', price: 89, description: 'Compact wireless sound for your everyday adventures.', color: '#dff3ed' },
  { id: 3, name: 'Everyday Backpack', category: 'Accessories', price: 74, description: 'A clean, durable bag with room for your essentials.', color: '#f8e9df' },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 58, description: 'Warm, adjustable lighting for your workspace.', color: '#fff1cc' },
  { id: 5, name: 'Ceramic Bottle', category: 'Home', price: 32, description: 'Reusable bottle with a minimal matte finish.', color: '#e1edf9' },
  { id: 6, name: 'Wireless Mouse', category: 'Accessories', price: 49, description: 'An ergonomic mouse for a tidy desk setup.', color: '#f7e2eb' },
  { id: 7, name: 'Mechanical Keyboard', category: 'Accessories', price: 149, description: 'Tactile typing in a compact, thoughtful layout.', color: '#e5eddf' },
  { id: 8, name: 'Travel Mug', category: 'Home', price: 28, description: 'Insulated mug for coffee on the move.', color: '#f5e7d8' },
  { id: 9, name: 'Wireless Earbuds', category: 'Audio', price: 99, description: 'Small earbuds with clear sound and a pocket case.', color: '#e4e5fb' }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Observable<Product[]> { return of(PRODUCTS); }
}
