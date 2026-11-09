import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatCard } from './stat-card';

@Component({ selector: 'app-dashboard', standalone: true, imports: [StatCard], templateUrl: './dashboard.html', styleUrl: './dashboard.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class Dashboard {
  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  readonly revenue = [42, 58, 49, 72, 65, 83, 76, 91, 70, 86, 96, 88];
  readonly activities = [
    { name: 'New subscription', detail: 'Acme Studio · 4 minutes ago', amount: '+$249' },
    { name: 'Invoice paid', detail: 'Northwind Co. · 28 minutes ago', amount: '+$1,200' },
    { name: 'New customer', detail: 'Mosaic Labs · 1 hour ago', amount: 'New' },
    { name: 'Plan upgraded', detail: 'Brightside · 3 hours ago', amount: '+$89' }
  ];
}
