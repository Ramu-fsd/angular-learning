import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { StoreProduct } from '../products/product.model';

describe('CartService', () => {
  let service: CartService;
  const product: StoreProduct = { id: 1, name: 'Demo item', category: 'Home', price: 10, description: 'Sample', color: '#eee' };
  beforeEach(() => { TestBed.configureTestingModule({}); service = TestBed.inject(CartService); });
  it('adds products and derives count and subtotal', () => {
    service.add(product);
    service.add(product);
    expect(service.itemCount()).toBe(2);
    expect(service.subtotal()).toBe(20);
  });
  it('removes a line when quantity reaches zero', () => {
    service.add(product);
    service.changeQuantity(product.id, 0);
    expect(service.items().length).toBe(0);
  });
});
