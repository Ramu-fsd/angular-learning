import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type BankButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type BankButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'bank-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [type]="type" [disabled]="disabled || loading" [class]="'bank-button ' + variant + ' ' + size" [attr.aria-busy]="loading"><span class="spinner" *ngIf="loading"></span><ng-content></ng-content></button>`,
  styles: [`
    :host{display:inline-block}.bank-button{border:1px solid transparent;border-radius:6px;font:600 13px/1.2 Inter,system-ui,sans-serif;padding:10px 15px;cursor:pointer;transition:background .15s,border .15s}.bank-button:disabled{opacity:.55;cursor:not-allowed}.primary{background:#245fc7;color:#fff}.primary:hover:not(:disabled){background:#194da8}.secondary{background:#fff;border-color:#d5deea;color:#34445c}.secondary:hover:not(:disabled){background:#f4f7fb}.danger{background:#b93636;color:#fff}.ghost{background:transparent;color:#315f9f}.small{padding:7px 10px;font-size:11px}.large{padding:13px 19px;font-size:14px}.spinner{display:inline-block;width:11px;height:11px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;margin-right:7px;vertical-align:-1px;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
  `]
})
export class BankButtonComponent {
  @Input() variant: BankButtonVariant = 'primary';
  @Input() size: BankButtonSize = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
