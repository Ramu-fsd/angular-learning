# NgRx fundamentals

NgRx Store is useful when state transitions need to be explicit, replayable, testable, and shared across a larger application.

Core flow:

```text
Component -> dispatch(Action) -> Reducer -> Store
                                  ^
Component <- Selector <-----------|
```

## Example: payment status reducer

Install NgRx packages in an Angular workspace when practising:

```bash
ng add @ngrx/store
```

```ts
import { createAction, createReducer, on, props } from '@ngrx/store';

export interface Payment {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface PaymentsState {
  items: Payment[];
  selectedId: string | null;
}

export const approvePayment = createAction(
  '[Payments] Approve',
  props<{ paymentId: string }>()
);

export const selectPayment = createAction(
  '[Payments] Select',
  props<{ paymentId: string | null }>()
);

export const initialState: PaymentsState = {
  items: [{ id: 'p-1001', status: 'PENDING' }],
  selectedId: null
};

export const paymentsReducer = createReducer(
  initialState,
  on(approvePayment, (state, { paymentId }) => ({
    ...state,
    items: state.items.map(payment =>
      payment.id === paymentId ? { ...payment, status: 'APPROVED' } : payment
    )
  })),
  on(selectPayment, (state, { paymentId }) => ({
    ...state,
    selectedId: paymentId
  }))
);
```

## Exercises

- Add a reject action.
- Add selectors for pending payments and selected payment.
- Register the reducer with `provideStore` in a standalone Angular application.
- Write reducer unit tests for valid and unknown payment IDs.
