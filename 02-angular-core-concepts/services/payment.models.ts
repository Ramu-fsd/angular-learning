export interface PaymentDraftRequest {
  readonly sourceAccountId: string;
  readonly beneficiaryId: string;
  /** Integer minor units, e.g. 105025 = INR 1,050.25. */
  readonly amountMinorUnits: number;
  readonly currency: 'INR';
  readonly idempotencyKey: string;
}

export interface PaymentSubmission {
  readonly paymentId: string;
  readonly status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  readonly submittedAt: string;
}

export interface BeneficiarySummary {
  readonly id: string;
  readonly displayName: string;
  readonly maskedAccount: string;
}
