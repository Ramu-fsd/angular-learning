import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bank-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `<header class="page-header"><div><div class="eyebrow" *ngIf="eyebrow">{{ eyebrow }}</div><h1>{{ title }}</h1><p *ngIf="description">{{ description }}</p></div><div class="actions"><ng-content></ng-content></div></header>`,
  styles: [`
    :host{display:block}.page-header{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:20px}h1{font:700 25px/1.2 Inter,system-ui,sans-serif;letter-spacing:-.5px;color:#1c2a40;margin:5px 0}.eyebrow{font:800 9px/1.2 Inter,system-ui,sans-serif;letter-spacing:1.2px;color:#2868c8}p{font:400 11px/1.5 Inter,system-ui,sans-serif;color:#8490a2;margin:0}.actions{display:flex;align-items:center;gap:8px}@media(max-width:620px){.page-header{align-items:flex-start;flex-direction:column}}
  `]
})
export class BankPageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() eyebrow = '';
}
