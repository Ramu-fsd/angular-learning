import { Component, Input } from '@angular/core';

@Component({
  selector: 'bank-empty-state',
  standalone: true,
  template: `<div class="empty"><div class="icon">{{ icon }}</div><h3>{{ title }}</h3><p>{{ description }}</p><div class="action"><ng-content></ng-content></div></div>`,
  styles: [`
    :host{display:block}.empty{text-align:center;padding:34px 18px;border:1px dashed #d8e1ec;border-radius:9px;background:#fbfcfe}.icon{margin:0 auto 12px;width:38px;height:38px;border-radius:11px;background:#edf3fc;color:#376bb5;display:grid;place-items:center;font-size:20px}h3{font:700 13px Inter,system-ui,sans-serif;color:#29384f;margin:0 0 6px}p{font:400 10px/1.5 Inter,system-ui,sans-serif;color:#8792a3;margin:0 0 14px}.action{display:flex;justify-content:center}
  `]
})
export class BankEmptyStateComponent {
  @Input() title = 'Nothing to display';
  @Input() description = 'There are no records available.';
  @Input() icon = '⌕';
}
