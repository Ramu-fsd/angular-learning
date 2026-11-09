import { Pipe, PipeTransform } from '@angular/core';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REVERSED';

@Pipe({
  name: 'transactionStatus',
  standalone: true,
  pure: true
})
export class TransactionStatusPipe implements PipeTransform {
  transform(status: PaymentStatus | string | null | undefined): string {
    if (!status) return 'Unknown';

    const labels: Record<PaymentStatus, string> = {
      PENDING: 'Awaiting processing',
      PROCESSING: 'Processing',
      COMPLETED: 'Completed',
      FAILED: 'Failed',
      REVERSED: 'Reversed'
    };

    return status in labels
      ? labels[status as PaymentStatus]
      : 'Unrecognized status';
  }
}
