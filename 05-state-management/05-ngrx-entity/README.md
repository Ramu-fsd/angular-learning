# NgRx Entity

NgRx Entity provides a normalized collection shape and reducer helpers for CRUD-heavy features.

Install:

```bash
npm install @ngrx/entity @ngrx/store
```

## Example: KYC customer records

```ts
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface KycCase {
  id: string;
  customerName: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface KycState extends EntityState<KycCase> {
  selectedCaseId: string | null;
}

export const kycAdapter = createEntityAdapter<KycCase>({
  selectId: item => item.id,
  sortComparer: (a, b) => a.customerName.localeCompare(b.customerName)
});

export const initialKycState: KycState = kycAdapter.getInitialState({
  selectedCaseId: null
});
```

## Exercises

- Add actions and reducer handlers for loading and verifying a KYC case.
- Use adapter methods such as `addMany`, `upsertOne`, `updateOne`, and `removeOne`.
- Add selectors for all cases, pending cases, and high-risk cases.
