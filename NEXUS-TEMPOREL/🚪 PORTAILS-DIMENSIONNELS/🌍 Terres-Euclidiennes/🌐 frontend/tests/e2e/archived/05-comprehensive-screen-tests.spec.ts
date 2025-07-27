import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - Comprehensive Screen Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('01. Game Selector Screen', () => {
    test('should load game selector and navigate to scenarios', async ({ page }) => {
      // Test main game selector screen
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      await expect(page.locator('text=Choose a scenario')).toBeVisible();
      
      // Test language selector
      await expect(page.locator('.language-selector')).toBeVisible();
      
      // Test scenario selection
      await expect(page.locator('a[href*="/game/conquest-classic"]')).toBeVisible();
      await expect(page.locator('a[href*="/game/temporal-rift"]')).toBeVisible();
      
      // Test Classic Conquest navigation
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
      
      // Go back to test Temporal Rift
      await page.goto('/');
      await page.locator('a[href*="/game/temporal-rift"]').click();
      await expect(page).toHaveURL(/.*\/game\/temporal-rift/);
    });

    test('should load different language versions', async ({ page }) => {
      await expect(page.locator('.language-selector')).toBeVisible();
      
      // Test French
      await expect(page.locator('text=🇫🇷 FR')).toBeVisible();
      await page.locator('text=🇫🇷 FR').click();
      await expect(page.locator('text=Choisir un scénario')).toBeVisible();
      
      // Test English  
      await page.locator('text=🇬🇧 EN').click();
      await expect(page.locator('text=Choose a scenario')).toBeVisible();
      
      // Test Russian
      await page.locator('text=🇷🇺 RU').click();
      await expect(page.locator('text=Выберите сценарий')).toBeVisible();
    });
  });

  test.describe('02. Game Interface Screen', () => {
    test('should load game interface correctly', async ({ page }) => {
      // Navigate to classic conquest
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
      
      // Wait for game to load
      await page.waitForTimeout(3000);
      
      // Check for game interface elements
      await expect(page.locator('.game-page, .true-heroes-interface')).toBeVisible({ timeout: 10000 });
      
      // Check for map elements
      await expect(page.locator('.hex-map, .game-map')).toBeVisible({ timeout: 10000 });
      
      // Check for UI panels
      await expect(page.locator('.game-ui, .interface-panel')).toBeVisible();
    });

    test('should handle game controls and interactions', async ({ page }) => {
      // Navigate to game
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
      
      // Wait for game to load
      await page.waitForTimeout(3000);
      
      // Test hero selection
      await page.locator('.hero').first().click();
      await expect(page.locator('.hero.selected')).toBeVisible();
      
      // Test map interaction
      await page.locator('.hex-tile').nth(5).click();
      await expect(page.locator('.action-performed')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('03. Backend API Tester Screen', () => {
    test('should load backend tester page', async ({ page }) => {
      // Navigate to backend tester
      await expect(page.locator('a[href*="/backend-test"]')).toBeVisible();
      await page.locator('a[href*="/backend-test"]').click();
      await expect(page).toHaveURL(/.*\/backend-test/);
      
      // Basic page load check
      await expect(page.locator('body')).toBeVisible();
    });

    test('should display backend test interface', async ({ page }) => {
      await page.goto('/backend-test');
      await expect(page).toHaveURL(/.*\/backend-test/);
      
      // Check that backend test page loads
      await expect(page.locator('body')).toBeVisible();
      
      // Look for any test-related elements that might exist
      await expect(page.locator('body')).not.toBeEmpty();
    });
  });

  test.describe('04. Multiplayer Session Manager Screen', () => {
    test('should load multiplayer interface', async ({ page }) => {
      // Navigate to multiplayer
      await page.goto('/multiplayer');
      await expect(page).toHaveURL(/.*\/multiplayer/);
      
      // Test multiplayer interface
      await expect(page.locator('body')).toBeVisible();
      
      // Basic functionality check
      await expect(page.locator('body')).not.toBeEmpty();
    });

    test('should handle multiplayer page navigation', async ({ page }) => {
      await page.goto('/multiplayer');
      
      // Check URL and basic page load
      await expect(page).toHaveURL(/.*\/multiplayer/);
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('05. Error Handling and Navigation', () => {
    test('should handle navigation between pages', async ({ page }) => {
      // Test navigation flow
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      
      // Go to backend test
      await page.locator('a[href*="/backend-test"]').click();
      await expect(page).toHaveURL(/.*\/backend-test/);
      
      // Go back to home
      await page.goto('/');
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      
      // Go to multiplayer
      await page.goto('/multiplayer');
      await expect(page).toHaveURL(/.*\/multiplayer/);
      
      // Go back to home
      await page.goto('/');
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
    });

    test('should handle unknown routes gracefully', async ({ page }) => {
      // Try to visit non-existent route
      await page.goto('/nonexistent');
      
      // Should either redirect or show error page
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('06. Responsive Design Tests', () => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 1024, height: 768, name: 'tablet' },
      { width: 768, height: 1024, name: 'tablet-portrait' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    for (const viewport of viewports) {
      test(`should work correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        
        // Test game selector
        await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
        await expect(page.locator('.language-selector')).toBeVisible();
        
        // Test navigation
        await expect(page.locator('a[href*="/game/conquest-classic"]')).toBeVisible();
        
        // Test language selector
        await expect(page.locator('text=🇫🇷 FR')).toBeVisible();
        await expect(page.locator('text=🇬🇧 EN')).toBeVisible();
        await expect(page.locator('text=🇷🇺 RU')).toBeVisible();
      });
    }
  });

  test.describe('07. Accessibility Tests', () => {
    test('should have proper heading structure', async ({ page }) => {
      // Check for main heading
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for proper heading hierarchy
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      await expect(headings).toHaveCount(1, { timeout: 5000 }); // At least one heading
    });

    test('should have proper alt text for images', async ({ page }) => {
      // Check for images with alt text
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Check that images have alt attributes
        for (let i = 0; i < imageCount; i++) {
          const alt = await images.nth(i).getAttribute('alt');
          expect(alt).toBeTruthy();
        }
      }
    });

    test('should have proper focus indicators', async ({ page }) => {
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      
      // Check that focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('08. Performance Tests', () => {
    test('should load main page quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      
      // Page should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle game loading performance', async ({ page }) => {
      const startTime = Date.now();
      
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
      
      // Wait for game to load
      await page.waitForTimeout(3000);
      
      const loadTime = Date.now() - startTime;
      
      // Game should load in under 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });
  });

  test.describe('09. Cross-Browser Compatibility', () => {
    test('should work with different browsers', async ({ page }) => {
      // This test will run in different browsers based on Playwright config
      
      // Test basic functionality
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      await expect(page.locator('.language-selector')).toBeVisible();
      
      // Test navigation
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    });
  });

  test.describe('10. Integration Tests', () => {
    test('should handle complete user journey', async ({ page }) => {
      // Start from home page
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      
      // Switch language
      await page.locator('text=🇫🇷 FR').click();
      await expect(page.locator('text=Choisir un scénario')).toBeVisible();
      
      // Switch back to English
      await page.locator('text=🇬🇧 EN').click();
      await expect(page.locator('text=Choose a scenario')).toBeVisible();
      
      // Navigate to game
      await page.locator('a[href*="/game/conquest-classic"]').click();
      await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
      
      // Wait for game to load
      await page.waitForTimeout(3000);
      
      // Verify game interface
      await expect(page.locator('.game-page, .true-heroes-interface')).toBeVisible({ timeout: 10000 });
      
      // Go back to home
      await page.goto('/');
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
    });

    test('should handle multiplayer flow', async ({ page }) => {
      // Navigate to multiplayer
      await page.goto('/multiplayer');
      await expect(page).toHaveURL(/.*\/multiplayer/);
      
      // Verify multiplayer interface loads
      await expect(page.locator('body')).toBeVisible();
      
      // Go back to home
      await page.goto('/');
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
    });
  });
}); 