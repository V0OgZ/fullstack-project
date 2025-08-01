# Test Fixes for Multilingual Support

## Problem
The Playwright tests were failing because they used text-based selectors (e.g., `getByText('Conquest Classic')`) which don't work when the interface language changes.

## Solution
1. **Force English language** in all tests by setting localStorage before page load
2. **Use data-testid selectors** instead of text-based selectors
3. **Use class selectors** for UI elements that don't have testids

## Changes Made

### Language Forcing
Added to all test files:
```typescript
await page.addInitScript(() => {
  localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
    state: { language: 'en' },
    version: 0
  }));
});
```

### Selector Updates
- `getByText('Conquest Classic')` → `getByTestId('scenario-card-conquest-classic')`
- `getByRole('button', { name: 'Start Game' })` → `getByTestId('play-button-conquest-classic')`
- `button:has-text("Create Session")` → `[data-testid="create-session-btn"]`
- `button:has-text("⭐")` → `.end-turn-btn`
- `button:has-text("Start Battle")` → `[data-testid="create-new-game-btn"]`

### Files Modified
1. `🌐 frontend/🧪 tests/e2e/terrain-vision-demo.spec.ts`
2. `🌐 frontend/🧪 tests/e2e/terrain-vision.spec.ts`
3. `🌐 frontend/🧪 tests/e2e/multiplayer-demo.spec.ts`
4. `🌐 frontend/🧪 tests/e2e/02-multiplayer-demo.spec.ts`

## Best Practices for Future Tests
1. Always use `data-testid` attributes when available
2. Use class selectors as second choice
3. Avoid text-based selectors unless absolutely necessary
4. If text selectors are needed, force a specific language first
5. Consider adding more data-testid attributes to UI components for better test stability 