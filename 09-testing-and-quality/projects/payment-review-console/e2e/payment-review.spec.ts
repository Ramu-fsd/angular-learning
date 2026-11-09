import { test, expect } from '@playwright/test';

test('operator can approve a pending payment', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Payment Review Console' })).toBeVisible();
  await expect(page.getByText('Pending review')).toBeVisible();

  const paymentRow = page.getByRole('row').filter({ hasText: 'PAY-2026-1001' });
  await expect(paymentRow.getByText('PENDING')).toBeVisible();
  await paymentRow.getByRole('button', { name: 'Approve' }).click();
  await expect(paymentRow.getByText('APPROVED')).toBeVisible();
});
