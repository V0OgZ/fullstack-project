import { test, expect } from '@playwright/test';

test('load Classic Conquest scenario', async ({ page }) => {
  // Capture console logs
  const logs: string[] = [];
  page.on('console', msg => {
    logs.push(`${msg.type()}: ${msg.text()}`);
    console.log(`[Browser ${msg.type()}] ${msg.text()}`);
  });

  await page.goto('/');
  
  // Take screenshot before clicking
  await page.screenshot({ path: 'before-click.png' });
  
  // Click on scenario with explicit wait
  await page.getByTestId('play-button-conquest-classic').click();
  
  // Take screenshot after clicking
  await page.screenshot({ path: 'after-click.png' });
  
  // Wait for URL change
  await page.waitForURL('**/game/conquest-classic', { timeout: 10000 });
  
  // Log current URL
  console.log(`Current URL: ${page.url()}`);
  
  // Wait until loading message disappears (if present)
  await page.waitForSelector('text=Loading...', { state: 'hidden', timeout: 30000 }).catch(() => {
    console.log('Loading message not found or already hidden');
  });
  
  // Check for game page or interface
  await expect(page.locator('.game-page, .true-heroes-interface')).toBeVisible({ timeout: 30000 });
  
  // Print all logs if test fails
  test.info().annotations.push({
    type: 'Browser logs',
    description: logs.join('\n')
  });
}); 