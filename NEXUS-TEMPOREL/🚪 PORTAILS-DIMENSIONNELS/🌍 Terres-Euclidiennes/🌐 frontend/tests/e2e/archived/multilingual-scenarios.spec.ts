import { test, expect } from '@playwright/test';

test.describe('Multilingual Scenario Loading', () => {
  test('should load scenarios in different languages', async ({ page }) => {
    console.log('🌍 Testing multilingual scenario loading...');
    
    // Go to the home page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForSelector('.language-selector');
    
    // Test English (default)
    console.log('🇺🇸 Testing English scenarios...');
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]');
    let scenarioTitle = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-title').textContent();
    expect(scenarioTitle).toBe('Classic Conquest');
    
    // Switch to French
    console.log('🇫🇷 Switching to French...');
    await page.locator('.language-selector button[title="Français"]').click();
    
    // Wait for scenarios to reload
    await page.waitForTimeout(3000);
    
    // Check French translation
    scenarioTitle = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-title').textContent();
    expect(scenarioTitle).toBe('Conquête Classique');
    
    // Check scenario description in French
    const scenarioDescription = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-description').textContent();
    expect(scenarioDescription).toContain('traditionnel');
    
    // Switch to Russian
    console.log('🇷🇺 Switching to Russian...');
    await page.locator('.language-selector button[title="Русский"]').click();
    
    // Wait for scenarios to reload
    await page.waitForTimeout(3000);
    
    // Check Russian translation
    scenarioTitle = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-title').textContent();
    expect(scenarioTitle).toBe('Классическое Завоевание');
    
    // Check scenario description in Russian
    const scenarioDescriptionRu = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-description').textContent();
    expect(scenarioDescriptionRu).toContain('Традиционный');
    
    // Test Temporal Rift scenario in Russian
    const temporalTitle = await page.locator('[data-testid="scenario-card-temporal-rift"] .scenario-title').textContent();
    expect(temporalTitle).toBe('Временной Разлом');
    
    // Test Multiplayer Arena scenario in Russian
    const arenaTitle = await page.locator('[data-testid="scenario-card-multiplayer-arena"] .scenario-title').textContent();
    expect(arenaTitle).toBe('Многопользовательская Арена');
    
    // Test locked scenario (should use frontend translations)
    const lockedTitle = await page.locator('[data-testid="scenario-card-dragon-campaign"] .scenario-title').textContent();
    expect(lockedTitle).toBe('Кампания Дракона');
    
    console.log('✅ All multilingual tests passed!');
    
    // Take screenshot as proof
    await page.screenshot({ path: 'multilingual-scenarios-proof.png', fullPage: true });
  });
}); 