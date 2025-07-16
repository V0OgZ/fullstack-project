# 🧪 Game Script Engine Documentation

*Advanced Scripting System for Heroes of Time*

## 🎯 **Overview**

The **Game Script Engine** is a powerful scripting system integrated into Heroes of Time that allows developers, testers, and advanced players to automate game actions through simple text commands. It provides a direct interface to the game's backend API with real-time testing capabilities.

## 🏗️ **Architecture**

### **Core Components**
```
Game Script Engine System
├── GameScriptEngine.ts     # Core parsing and execution engine
├── GameScriptTester.tsx    # Visual testing interface
├── ApiService.ts          # API integration layer
└── TrueHeroesInterface.tsx # Integration point (🧪 button)
```

### **Data Flow**
```
User Input → Command Parser → API Call → Backend → Response → UI Update
```

## 🎮 **Available Commands**

### **Hero Management**
```bash
# Select a hero for subsequent actions
SELECT_HERO heroId

# Move hero to specific coordinates
MOVE heroId TO x,y

# Make hero attack a target
ATTACK heroId TARGET targetId

# Collect resources with hero
COLLECT heroId RESOURCE resourceId
```

### **Building & Construction**
```bash
# Build a structure at coordinates
BUILD buildingType AT x,y

# Upgrade an existing building
UPGRADE buildingId

# Recruit units from a building
RECRUIT unitType QUANTITY amount FROM buildingId
```

### **Magic & Spells**
```bash
# Cast a spell on a target
CAST spellId ON targetId

# Cast area effect spell at coordinates
CAST spellId AT x,y
```

### **Game Control**
```bash
# End current player's turn
END_TURN

# Wait for specified duration (ms)
WAIT duration

# Log a message to results
LOG "message"
```

## 🛠️ **Technical Implementation**

### **Command Parser**
```typescript
interface ParsedCommand {
  action: string;
  params: {
    [key: string]: any;
  };
}

class CommandParser {
  static parse(command: string): ParsedCommand {
    // Command parsing logic
    const tokens = command.trim().split(/\s+/);
    const action = tokens[0].toUpperCase();
    
    switch (action) {
      case 'MOVE':
        return {
          action: 'MOVE',
          params: {
            heroId: tokens[1],
            x: parseInt(tokens[3].split(',')[0]),
            y: parseInt(tokens[3].split(',')[1])
          }
        };
      // ... other commands
    }
  }
}
```

### **API Integration**
```typescript
class GameScriptEngine {
  private apiService: ApiService;
  
  async executeCommand(command: string): Promise<ScriptResult> {
    const parsed = CommandParser.parse(command);
    
    switch (parsed.action) {
      case 'MOVE':
        return await this.apiService.makeGenericRequest(
          'POST',
          `/api/games/${this.gameId}/heroes/${parsed.params.heroId}/move`,
          { targetPosition: { x: parsed.params.x, y: parsed.params.y } }
        );
        
      case 'BUILD':
        return await this.apiService.makeGenericRequest(
          'POST',
          `/api/games/${this.gameId}/buildings`,
          { 
            buildingType: parsed.params.type, 
            position: { x: parsed.params.x, y: parsed.params.y } 
          }
        );
        
      // ... other commands
    }
  }
}
```

### **Result Formatting**
```typescript
interface ScriptResult {
  success: boolean;
  message: string;
  data?: any;
  timestamp: number;
}

// Example result
{
  success: true,
  message: "Hero moved successfully",
  data: { newPosition: { x: 5, y: 3 }, movementPointsRemaining: 2 },
  timestamp: 1640995200000
}
```

## 🎯 **User Interface**

### **Three-Panel Layout**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GAME SCRIPT TESTER                                │
├─────────────────┬─────────────────────────┬─────────────────────────────────┤
│   EXAMPLES      │       EDITOR           │         RESULTS                 │
│                 │                        │                                 │
│ 📚 AVAILABLE    │ > SELECT_HERO hero1    │ ✅ Command executed             │
│ COMMANDS        │ > MOVE hero1 TO 5,3    │ ✅ Hero moved successfully      │
│                 │ > BUILD castle AT 5,3  │ ❌ Insufficient resources       │
│ • MOVE          │ > END_TURN             │                                 │
│ • BUILD         │                        │ 📊 Execution Time: 245ms       │
│ • RECRUIT       │ [Execute Command]      │ 📈 Success Rate: 75%           │
│ • CAST          │ [Execute Script]       │                                 │
│                 │                        │                                 │
└─────────────────┴────────────────────────┴─────────────────────────────────┘
```

### **Panel 1: Examples**
- **Live command reference** with syntax highlighting
- **Interactive examples** - click to copy to editor
- **Context-sensitive help** based on current game state
- **Command history** with recent successful executions

### **Panel 2: Editor**
- **Syntax highlighting** for command keywords
- **Auto-completion** for hero IDs, building types, etc.
- **Multi-line script support** with execution buttons
- **Error highlighting** for invalid syntax

### **Panel 3: Results**
- **Real-time execution feedback** with success/error indicators
- **JSON response display** with collapsible sections
- **Performance metrics** (execution time, success rate)
- **Export functionality** for test results

## 🎨 **Visual Design**

### **Color Scheme**
```css
/* Golden theme matching Heroes of Time aesthetic */
:root {
  --script-primary: #ffd700;      /* Gold */
  --script-secondary: #1a1a2e;    /* Dark Blue */
  --script-accent: #16213e;       /* Navy */
  --script-success: #4caf50;      /* Green */
  --script-error: #f44336;        /* Red */
  --script-warning: #ff9800;      /* Orange */
}
```

### **Component Styling**
```css
.script-tester {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #ffd700;
  border-radius: 12px;
  color: #ffd700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.script-editor {
  background: #2a2a3e;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  border: 1px solid #404040;
  border-radius: 8px;
}

.script-results {
  background: rgba(255, 215, 0, 0.05);
  border-left: 4px solid #ffd700;
  padding: 16px;
}
```

## 🧪 **Testing & Debugging**

### **Unit Tests**
```typescript
describe('GameScriptEngine', () => {
  it('should parse MOVE command correctly', () => {
    const result = CommandParser.parse('MOVE hero1 TO 5,3');
    expect(result.action).toBe('MOVE');
    expect(result.params.heroId).toBe('hero1');
    expect(result.params.x).toBe(5);
    expect(result.params.y).toBe(3);
  });

  it('should handle invalid commands gracefully', () => {
    const result = CommandParser.parse('INVALID_COMMAND');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Unknown command');
  });
});
```

### **Integration Tests**
```bash
# Test script execution in real environment
cd frontend
npx playwright test tests/e2e/script-tester-demo.spec.ts --headed

# Test API integration
npm test -- gameScriptEngine.test.ts
```

### **Performance Testing**
```javascript
// Measure script execution performance
const startTime = performance.now();
await scriptEngine.executeScript(complexScript);
const endTime = performance.now();
console.log(`Script execution time: ${endTime - startTime}ms`);
```

## 📋 **Usage Examples**

### **Basic Hero Movement**
```bash
# Simple movement sequence
SELECT_HERO hero1
MOVE hero1 TO 10,5
LOG "Hero moved to castle position"
```

### **Complex Building Sequence**
```bash
# Build and upgrade a castle
BUILD castle AT 10,5
WAIT 1000
UPGRADE castle1
RECRUIT archer QUANTITY 5 FROM castle1
LOG "Castle setup complete"
```

### **Combat Sequence**
```bash
# Attack sequence with spells
SELECT_HERO hero1
MOVE hero1 TO 15,10
CAST fireball ON enemy1
ATTACK hero1 TARGET enemy1
LOG "Combat sequence executed"
```

### **Full Turn Automation**
```bash
# Complete turn automation
LOG "Starting automated turn"
SELECT_HERO hero1
MOVE hero1 TO 5,3
BUILD castle AT 5,3
RECRUIT archer QUANTITY 3 FROM castle1
SELECT_HERO hero2
MOVE hero2 TO 8,7
CAST healing ON hero1
END_TURN
LOG "Turn completed successfully"
```

## 🚀 **Advanced Features**

### **Conditional Execution**
```bash
# Future feature: conditional commands
IF hero1.health < 50 THEN
  CAST healing ON hero1
  LOG "Hero healed"
ENDIF
```

### **Loops and Iteration**
```bash
# Future feature: loop support
FOR i IN 1 TO 5 DO
  RECRUIT archer QUANTITY 1 FROM castle1
  WAIT 500
ENDFOR
```

### **Variable System**
```bash
# Future feature: variable support
SET target_x = 10
SET target_y = 5
MOVE hero1 TO $target_x,$target_y
```

## 🔧 **Configuration**

### **Environment Variables**
```bash
# API endpoint configuration
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_SCRIPT_ENGINE_ENABLED=true
REACT_APP_SCRIPT_DEBUG_MODE=false
```

### **Script Engine Settings**
```typescript
interface ScriptEngineConfig {
  maxExecutionTime: number;      // 30000ms default
  maxScriptLength: number;       // 10000 chars default
  enableDebugMode: boolean;      // false default
  apiTimeout: number;            // 5000ms default
}
```

## 🛡️ **Security Considerations**

### **Input Validation**
- **Command sanitization** to prevent injection attacks
- **Parameter validation** for all user inputs
- **Rate limiting** to prevent API abuse
- **Session validation** to ensure authorized access

### **API Security**
- **Authentication required** for all API calls
- **Role-based access control** for different commands
- **Audit logging** for all script executions
- **Error message sanitization** to prevent information leakage

## 📊 **Performance Optimization**

### **Caching Strategy**
```typescript
class ScriptCache {
  private commandCache = new Map<string, ParsedCommand>();
  
  getCachedCommand(command: string): ParsedCommand | null {
    return this.commandCache.get(command) || null;
  }
  
  setCachedCommand(command: string, parsed: ParsedCommand): void {
    this.commandCache.set(command, parsed);
  }
}
```

### **Batch Execution**
```typescript
// Execute multiple commands in a single API call
async executeBatch(commands: string[]): Promise<ScriptResult[]> {
  const batch = commands.map(cmd => this.parseCommand(cmd));
  return await this.apiService.executeBatch(batch);
}
```

## 🌟 **Future Enhancements**

### **Planned Features**
- **Visual script builder** with drag-and-drop interface
- **Script templates** for common game scenarios
- **AI-assisted script generation** using machine learning
- **Real-time collaboration** on script development
- **Script marketplace** for sharing and downloading scripts

### **Integration Possibilities**
- **Webhook support** for external automation
- **REST API** for third-party script execution
- **Plugin system** for custom commands
- **Data export** for analytics and reporting

---

## 📝 **Conclusion**

The Game Script Engine transforms Heroes of Time from a simple strategy game into a programmable, extensible platform. Whether you're a developer testing new features, a QA engineer running automated tests, or an advanced player creating complex strategies, the scripting system provides unprecedented control and automation capabilities.

**Ready to script your victory?** Access the Game Script Engine through the 🧪 button in the main interface!

---

*🎮 Script your way to victory! ⚔️✨* 