import { Routes } from '@angular/router';
import { ProductCatalog } from './features/products/product-catalog';
export const routes: Routes = [
  { path: '', component: ProductCatalog },
  { path: '**', redirectTo: '' }
];
