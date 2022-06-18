import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('body > div > div > header > div > span')).toBe('Bortosky Family');
});
