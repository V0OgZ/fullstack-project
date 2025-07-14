import { test, expect } from '@playwright/test';

test.describe('Scenario Selection', () => {
  test('should load game when scenario Play button is clicked', async ({ page }) => {
    // Go to the homepage or scenario selector
    await page.goto('http://localhost:3000/');

    // Wait for scenario selector to be visible
    await page.waitForSelector('.scenario-card, .scenario-selector, [data-scenario-id]');

    // Find the Classic Conquest scenario card
    const scenarioCard = await page.locator('[data-testid="scenario-card-conquest-classic"]').first();
    await expect(scenarioCard).toBeVisible();

    // Find and click the Play button inside the scenario card
    const playButton = scenarioCard.locator('[data-testid="play-button-conquest-classic"]');
    await expect(playButton).toBeVisible();
    await playButton.click();

    // Wait for navigation to the game page
    await page.waitForURL(/\/game\/conquest-classic/);

    // Wait for the game interface to load
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });

    // Check if the game title is visible
    await expect(page.locator('.game-title')).toBeVisible();
    await expect(page.locator('.turn-info')).toBeVisible();
    await expect(page.locator('.game-renderer-container')).toBeVisible();
    await expect(page.locator('.game-side-panel')).toBeVisible();
    await expect(page.locator('.player-info-section')).toBeVisible();
  });
}); 