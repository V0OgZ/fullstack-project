import { test, expect } from '@playwright/test';

test.describe('Debug Session Error', () => {
  test('should identify the exact source of includes error', async ({ page }) => {
    // Capture ALL console messages and errors
    const allMessages: string[] = [];
    const allErrors: string[] = [];
    
    page.on('console', (msg) => {
      allMessages.push(`[${msg.type()}] ${msg.text()}`);
      if (msg.type() === 'error') {
        allErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      allErrors.push(`[PAGE ERROR] ${error.message}\n${error.stack}`);
    });

    console.log('🔍 Starting debug test...');
    
    // Navigate to home first
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    console.log('✅ Home page loaded');
    
    // Check if any errors occurred on home page
    if (allErrors.length > 0) {
      console.log('❌ Errors on home page:', allErrors);
    }
    
    // Clear previous errors
    allErrors.length = 0;
    
    // Navigate to multiplayer page
    console.log('🌐 Navigating to multiplayer page...');
    await page.goto('/multiplayer');
    
    // Wait a bit and capture errors
    await page.waitForTimeout(3000);
    
    // Log all captured errors with details
    console.log('📋 All console messages:', allMessages.slice(-20)); // Last 20 messages
    console.log('🚨 All errors:', allErrors);
    
    // Check for the specific includes error
    const includesErrors = allErrors.filter(err => err.includes('includes'));
    
    if (includesErrors.length > 0) {
      console.log('🎯 Found includes errors:', includesErrors);
      // Log the full stack trace
      includesErrors.forEach((err, index) => {
        console.log(`Error ${index + 1}:`, err);
      });
    } else {
      console.log('✅ No includes errors found');
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-multiplayer-error.png' });
    
    // Basic assertion
    expect(includesErrors).toHaveLength(0);
  });
}); 