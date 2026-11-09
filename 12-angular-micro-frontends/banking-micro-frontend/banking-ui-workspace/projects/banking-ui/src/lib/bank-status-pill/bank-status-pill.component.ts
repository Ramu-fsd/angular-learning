import { Component, Input } from '@angular/core';

export type BankStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'bank-status-pill',
  standalone: true,
  template: `<span class="pill" [class.success]="status === 'success'" [class.warning]="status === 'warning'" [class.danger]="status === 'danger'" [class.info]="status === 'info'" [class.neutral]="status === 'neutral'"><span class="dot"></span><ng-content></ng-content></span>`,
  styles: [`
    :host{display:inline-block}.pill{display:inline-flex;align-items:center;gap:6px;border-radius:20px;padding:5px 9px;font:700 10px/1 Inter,system-ui,sans-serif;white-space:nowrap}.dot{width:6px;height:6px;border-radius:50%;background:currentColor}.success{background:#e8f7ef;color:#16794e}.warning{background:#fff5df;color:#9a6813}.danger{background:#ffeded;color:#b83434}.info{background:#eaf1ff;color:#315fae}.neutral{background:#f0f2f5;color:#667085}
  `]
})
export class BankStatusPillComponent {
  @Input() status: BankStatus = 'neutral';
}
