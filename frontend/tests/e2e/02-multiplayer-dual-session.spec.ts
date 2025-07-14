import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - Multiplayer Dual Session', () => {
  test('should create and join multiplayer session', async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    await page1.goto('/');
    await page1.locator('[data-testid="multiplayer-button"]').click();
    await page1.locator('[data-testid="create-session-button"]').click();
    await page1.locator('[data-testid="session-name-input"]').fill('Test Session');
    await page1.locator('[data-testid="max-players-select"]').selectOption('4');
    await page1.locator('[data-testid="confirm-create-button"]').click();
    const sessionId = await page1.locator('[data-testid="session-id"]').textContent();
    await expect(page1.locator('[data-testid="session-status"]')).toHaveText('Waiting');

    await page2.goto('/');
    await page2.locator('[data-testid="multiplayer-button"]').click();
    await page2.locator('[data-testid="join-session-button"]').click();
    await page2.locator('[data-testid="session-id-input"]').fill(sessionId!);
    await page2.locator('[data-testid="confirm-join-button"]').click();
    await expect(page2.locator('[data-testid="session-status"]')).toHaveText('In Progress');

    await expect(page1.locator('[data-testid="player-count"]')).toHaveText('2/4');
    await expect(page2.locator('[data-testid="player-count"]')).toHaveText('2/4');
  });
}); 