# 🔍 Heroes of Time - Debug & Demo Modes

This document explains the new debugging and demonstration modes available for Heroes of Time.

## 📋 Prerequisites

Before using demo or debug modes, ensure the servers are running:

```bash
./start-app.sh  # Start both backend (8080) and frontend (3000)
```

## 🎮 Demo Mode

Launch a visual demonstration of the game with browser interface:

```bash
./frontend/start-demo.sh
```

### Features:
- ✅ Visual browser interface (headed mode)
- ✅ Automated gameplay demonstration
- ✅ Shows all major game features
- ✅ Great for presentations or testing UI

### What it demonstrates:
1. Scenario selection
2. Hero management
3. Map navigation
4. Movement system
5. Turn progression
6. Language switching

## 🔍 Debug Mode  

Run comprehensive error analysis in headless mode:

```bash
./frontend/start-debug.sh
```

### Features:
- ✅ Headless execution (no browser window)
- ✅ Comprehensive error capture
- ✅ Performance analysis
- ✅ State snapshots at key points
- ✅ Detailed JSON logs

### What it analyzes:
1. **Console Errors**: All JavaScript errors
2. **Render Errors**: "Maximum update depth exceeded" and other React issues
3. **Network Errors**: Failed API calls
4. **State Issues**: Captures game state at error points
5. **Performance**: Timing and resource usage

### Output Files:
- `debug-logs.json`: Complete analysis results
- `debug-logs.backup.json`: Previous run (if exists)

### Example Output:
```json
{
  "timestamp": "2025-01-15T14:30:00Z",
  "errors": [],
  "renderErrors": [{
    "type": "error",
    "text": "Maximum update depth exceeded",
    "location": {
      "url": "http://localhost:3000/static/js/bundle.js",
      "lineNumber": 12345,
      "columnNumber": 67
    },
    "severity": "CRITICAL",
    "analysis": "Infinite re-render loop detected"
  }],
  "stateSnapshots": [{
    "timestamp": "2025-01-15T14:30:01Z",
    "state": {
      "currentGame": "conquest-classique",
      "currentPlayer": "Player 1",
      "selectedHero": "Arthur",
      "mapSize": "20x15"
    }
  }]
}
```

## 🐛 Common Issues Detected

### 1. Maximum Update Depth Exceeded
**Cause**: useEffect with bad dependencies causing infinite loops
**Solution**: Check useEffect dependencies, remove state setters that trigger re-renders

### 2. Cannot read properties of undefined
**Cause**: Accessing properties on null/undefined objects
**Solution**: Add null checks before property access

### 3. Network timeouts
**Cause**: Backend not responding or slow
**Solution**: Check backend health, increase timeouts

## 🛠️ Advanced Usage

### Custom Debug Configuration

Edit `frontend/debug-mode.js` to customize:
```javascript
const DEBUG_CONFIG = {
  headless: true,      // Set to false to see browser
  slowMo: 0,          // Add delay between actions (ms)
  timeout: 30000,     // Test timeout (ms)
  logFile: 'debug-logs.json'
};
```

### Adding Custom Tests

Add new test scenarios in the `runDebugSession()` function:
```javascript
// Test 6: Your custom test
console.log('📍 Test 6: Custom interaction');
await page.click('.your-selector');
await captureDebugInfo(page);
```

## 📊 Interpreting Results

### Severity Levels:
- **CRITICAL**: Application-breaking errors (infinite loops, crashes)
- **ERROR**: Functional errors (failed API calls, missing data)
- **WARNING**: Non-critical issues (deprecations, performance)
- **INFO**: Useful debugging information

### Action Items:
1. Fix CRITICAL errors first
2. Address ERROR level issues
3. Review WARNING messages
4. Use INFO for optimization

## 🔧 Troubleshooting

### Scripts won't run
```bash
chmod +x frontend/start-demo.sh frontend/start-debug.sh
```

### "Servers not detected" error
Ensure both servers are running:
```bash
./start-app.sh
```

### No Playwright installed
```bash
cd frontend && npm install
```

## 📝 Best Practices

1. **Run debug mode after major changes**
2. **Save debug logs for comparison** 
3. **Fix errors incrementally**
4. **Test fixes with demo mode**
5. **Document recurring issues**

## 🚀 Quick Commands

```bash
# Full debug workflow
./start-app.sh              # Start servers
./frontend/start-debug.sh   # Run debug analysis
cat frontend/debug-logs.json | jq '.errors'  # View errors
./frontend/start-demo.sh    # Visual verification
```

## 💡 Tips

- Use debug mode in CI/CD pipelines
- Compare debug logs before/after changes
- Create custom debug scenarios for new features
- Monitor performance metrics over time

---

For more information, see `DEVELOPER_INSTRUCTIONS.md` 