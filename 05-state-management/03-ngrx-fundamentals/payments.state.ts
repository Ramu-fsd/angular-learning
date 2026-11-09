import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';

export interface Payment {
  id: string;
  reference: string;
  amount: number;
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

export const setSelectedPayment = createAction(
  '[Payments] Set Selected',
  props<{ paymentId: string | null }>()
);

export const initialPaymentsState: PaymentsState = {
  items: [],
  selectedId: null
};

export const paymentsReducer = createReducer(
  initialPaymentsState,
  on(approvePayment, (state, { paymentId }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === paymentId ? { ...item, status: 'APPROVED' } : item
    )
  })),
  on(setSelectedPayment, (state, { paymentId }) => ({
    ...state,
    selectedId: paymentId
  }))
);

export interface AppState {
  payments: PaymentsState;
}

const selectPaymentsState = (state: AppState) => state.payments;

export const selectAllPayments = createSelector(
  selectPaymentsState,
  state => state.items
);

export const selectPendingPayments = createSelector(
  selectAllPayments,
  payments => payments.filter(payment => payment.status === 'PENDING')
);
