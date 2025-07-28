import { test, expect } from '@playwright/test';

test.describe('Language Availability Handling', () => {
  test('should show unavailable languages with proper styling and tooltip', async ({ page }) => {
    console.log('🔍 Testing language availability handling...');
    
    // Go to the home page
    await page.goto('http://localhost:3000');
    
    // Wait for the language selector to load
    await page.waitForSelector('.language-selector');
    
    // Wait for language availability to be checked
    await page.waitForTimeout(3000);
    
    // Check that Russian button has unavailable class
    const russianButton = page.locator('.language-selector button[title*="Русский"]');
    await expect(russianButton).toHaveClass(/unavailable/);
    
    // Check that the tooltip shows the translation status
    const russianTitle = await russianButton.getAttribute('title');
    expect(russianTitle).toContain('2/3 scenarios translated');
    
    // Check that English and French are available
    const englishButton = page.locator('.language-selector button[title*="English"]');
    const frenchButton = page.locator('.language-selector button[title*="Français"]');
    
    await expect(englishButton).not.toHaveClass(/unavailable/);
    await expect(frenchButton).not.toHaveClass(/unavailable/);
    
    // Test switching to Russian still works but shows missing translations
    await russianButton.click();
    
    // Wait for scenarios to load
    await page.waitForTimeout(3000);
    
    // Check that available scenarios are translated
    const conquestTitle = await page.locator('[data-testid="scenario-card-conquest-classic"] .scenario-title').textContent();
    expect(conquestTitle).toBe('Классическое Завоевание');
    
    const temporalTitle = await page.locator('[data-testid="scenario-card-temporal-rift"] .scenario-title').textContent();
    expect(temporalTitle).toBe('Временной Разлом');
    
    // Check that missing translation shows as fallback (translation key or English)
    const arenaTitle = await page.locator('[data-testid="scenario-card-multiplayer-arena"] .scenario-title').textContent();
    expect(arenaTitle).toMatch(/scenarios\.multiplayer-arena\.name|Multiplayer Arena/);
    
    console.log('✅ Language availability test passed!');
    
    // Take screenshot as proof
    await page.screenshot({ path: 'language-availability-proof.png', fullPage: true });
  });
  
  test('should handle API errors gracefully', async ({ page }) => {
    console.log('🔍 Testing graceful handling of API errors...');
    
    // Intercept the language availability API call and make it fail
    await page.route('**/api/scenarios/languages', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    // Go to the home page
    await page.goto('http://localhost:3000');
    
    // Wait for the language selector to load
    await page.waitForSelector('.language-selector');
    
    // Wait for fallback to be applied
    await page.waitForTimeout(3000);
    
    // All languages should be available as fallback
    const russianButton = page.locator('.language-selector button[title*="Русский"]');
    const englishButton = page.locator('.language-selector button[title*="English"]');
    const frenchButton = page.locator('.language-selector button[title*="Français"]');
    
    await expect(russianButton).not.toHaveClass(/unavailable/);
    await expect(englishButton).not.toHaveClass(/unavailable/);
    await expect(frenchButton).not.toHaveClass(/unavailable/);
    
    console.log('✅ API error handling test passed!');
  });
}); 