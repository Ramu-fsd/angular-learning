export type PaymentPermission =
  | 'PAYMENT_VIEW'
  | 'PAYMENT_APPROVE'
  | 'PAYMENT_REVERSE';

export interface UiPrincipal {
  readonly subject: string;
  readonly permissions: readonly PaymentPermission[];
}

/**
 * UI convenience only. Never use this function as the security boundary.
 * The API must independently authorize the principal and target payment.
 */
export function canShowPaymentAction(
  principal: UiPrincipal,
  permission: PaymentPermission
): boolean {
  return principal.permissions.includes(permission);
}
