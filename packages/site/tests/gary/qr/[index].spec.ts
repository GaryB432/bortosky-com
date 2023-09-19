import { expect, test } from '@playwright/test';

test('has generated article', async ({ page }) => {
  await page.goto('/gary/qr/_index_');
  expect(await page.textContent('article.a')).toContain('works');
});
