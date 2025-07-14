import { test, expect } from '@playwright/test';

test.describe('Scenario Selection', () => {
  test('should load game when scenario Play button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('[data-testid="scenario-card"]').first().click();
    await page.locator('[data-testid="start-game-button"]').click();
    await expect(page).toHaveURL(/game/);
  });
}); 