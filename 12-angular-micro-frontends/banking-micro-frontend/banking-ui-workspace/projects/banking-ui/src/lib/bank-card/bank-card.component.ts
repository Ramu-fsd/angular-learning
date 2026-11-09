import { Component, Input } from '@angular/core';

@Component({
  selector: 'bank-card',
  standalone: true,
  template: `<section class="bank-card" [class.interactive]="interactive"><ng-content></ng-content></section>`,
  styles: [`
    :host{display:block}.bank-card{background:#fff;border:1px solid #e4eaf2;border-radius:10px;padding:18px;box-shadow:0 1px 2px rgba(16,35,65,.03)}.bank-card.interactive{transition:box-shadow .15s,border-color .15s}.bank-card.interactive:hover{border-color:#c7d7ef;box-shadow:0 5px 18px rgba(30,65,115,.08)}
  `]
})
export class BankCardComponent {
  @Input() interactive = false;
}
