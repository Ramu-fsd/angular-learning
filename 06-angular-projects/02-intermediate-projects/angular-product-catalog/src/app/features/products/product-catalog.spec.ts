import { TestBed } from '@angular/core/testing';
import { ProductCatalog } from './product-catalog';
describe('ProductCatalog', () => {
  it('loads the sample products and filters by category', () => {
    TestBed.configureTestingModule({ imports: [ProductCatalog] });
    const component = TestBed.createComponent(ProductCatalog).componentInstance;
    expect(component.products().length).toBe(9);
    component.updateCategory('Audio');
    expect(component.filtered().length).toBe(3);
  });
});
