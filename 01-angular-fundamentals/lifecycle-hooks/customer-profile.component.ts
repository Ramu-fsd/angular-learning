import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

interface CustomerProfile {
  id: string;
  displayName: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  template: `
    @if (loading()) {
      <p role="status">Loading customer profile…</p>
    } @else if (errorMessage()) {
      <p role="alert">{{ errorMessage() }}</p>
    } @else if (profile(); as customer) {
      <h2>{{ customer.displayName }}</h2>
      <p>KYC status: {{ customer.kycStatus }}</p>
    }
  `
})
export class CustomerProfileComponent {
  readonly customerId = input.required<string>();
  readonly profile = signal<CustomerProfile | null>(null);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect((onCleanup) => {
      const id = this.customerId();
      this.loading.set(true);
      this.errorMessage.set('');

      const subscription = this.http
        .get<CustomerProfile>(`/api/customers/${encodeURIComponent(id)}/profile`)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (profile) => {
            this.profile.set(profile);
            this.loading.set(false);
          },
          error: () => {
            this.errorMessage.set('Unable to load the customer profile. Try again later.');
            this.loading.set(false);
          }
        });

      onCleanup(() => subscription.unsubscribe());
    });
  }
}
