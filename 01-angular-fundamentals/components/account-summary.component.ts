import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BankAccount } from '../typescript-fundamentals/account.models';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  template: `
    <article class="account-card">
      <h2>{{ account().accountName }}</h2>
      <p>Account {{ account().maskedAccountNumber }}</p>
      <p>
        Available balance:
        <strong>
          {{ account().availableBalance.minorUnits / 100
            | number:'1.2-2' }}
          {{ account().availableBalance.currency }}
        </strong>
      </p>
      <p>Status: {{ account().status }}</p>
      <button type="button" (click)="viewTransactions.emit(account().id)">
        View transactions
      </button>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSummaryComponent {
  readonly account = input.required<BankAccount>();
  readonly viewTransactions = output<string>();
}
