import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({ selector: 'app-product-catalog', standalone: true, imports: [CurrencyPipe], templateUrl: './product-catalog.html', styleUrl: './product-catalog.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class ProductCatalog {
  private readonly productService = inject(ProductService);
  readonly products = signal<Product[]>([]);
  readonly query = signal('');
  readonly category = signal('All');
  readonly sort = signal<'featured' | 'low' | 'high'>('featured');
  readonly page = signal(1);
  readonly pageSize = 6;
  readonly categories = ['All', 'Audio', 'Accessories', 'Home'];
  readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.products()
      .filter(p => this.category() === 'All' || p.category === this.category())
      .filter(p => !term || `${p.name} ${p.description}`.toLowerCase().includes(term))
      .sort((a, b) => this.sort() === 'low' ? a.price - b.price : this.sort() === 'high' ? b.price - a.price : a.id - b.id);
  });
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  readonly visible = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));

  constructor() { this.productService.getProducts().subscribe(products => this.products.set(products)); }
  updateQuery(value: string): void { this.query.set(value); this.page.set(1); }
  updateCategory(value: string): void { this.category.set(value); this.page.set(1); }
  updateSort(value: string): void { this.sort.set(value as 'featured' | 'low' | 'high'); this.page.set(1); }
  previous(): void { this.page.update(p => Math.max(1, p - 1)); }
  next(): void { this.page.update(p => Math.min(this.pageCount(), p + 1)); }
}
