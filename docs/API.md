# 🔧 Heroes of Time - REST API Documentation

## 🌐 **Base URL**
```
http://localhost:8080/api/temporal
```

## 📋 **API Overview**

Heroes of Time provides a comprehensive REST API for game management, script execution, and temporal mechanics. All endpoints return JSON responses with consistent error handling.

## 🎮 **Game Management**

### **Create Game**
```http
POST /games
Content-Type: application/json

{
  "gameName": "Epic Battle",
  "maxPlayers": 2,
  "mapWidth": 50,
  "mapHeight": 50
}
```

**Response:**
```json
{
  "success": true,
  "gameId": 123,
  "gameName": "Epic Battle",
  "status": "ACTIVE",
  "currentPlayer": "Player1",
  "currentTurn": 1
}
```

### **Get Game State**
```http
GET /games/{gameId}
```

**Response:**
```json
{
  "gameId": 123,
  "gameName": "Epic Battle",
  "currentTurn": 5,
  "currentPlayer": "Player1",
  "status": "ACTIVE",
  "heroes": [
    {
      "name": "Arthur",
      "position": {"x": 15, "y": 15},
      "health": 100,
      "temporalEnergy": 50
    }
  ],
  "psiStates": [
    {
      "psiId": "ψ001",
      "expression": "⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))",
      "status": "ACTIVE"
    }
  ]
}
```

### **Next Turn**
```http
POST /games/{gameId}/next-turn
```

## 🎯 **Script Execution**

### **Execute Single Command**
```http
POST /execute
Content-Type: application/json

{
  "gameId": 123,
  "command": "HERO: Arthur"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hero Arthur created successfully",
  "executionTime": 45
}
```

### **Execute Script File**
```http
POST /scripts/execute
Content-Type: application/json

{
  "scriptFile": "demos/simple-game.hots",
  "parser": "regex",
  "gameId": 123,
  "verbose": true
}
```

**Response:**
```json
{
  "success": true,
  "gameId": 123,
  "scriptPath": "demos/simple-game.hots",
  "parser": "regex",
  "successCount": 7,
  "errorCount": 0,
  "totalCommands": 7,
  "stats": {
    "duration": 245,
    "avgTimePerCommand": 35.0
  },
  "executionLog": [
    "✅ HERO: Arthur",
    "✅ MOV(Arthur, @10,10)",
    "✅ ψ001: ⊙(Δt+1 @12,12 ⟶ MOV(Arthur, @12,12))",
    "✅ †ψ001"
  ]
}
```

### **Execute Script Verbose**
```http
POST /scripts/execute-verbose
Content-Type: application/json

{
  "scriptFile": "scenarios/epic-arthur-vs-ragnar.hots",
  "parser": "regex"
}
```

### **List Available Scripts**
```http
GET /scripts/list
```

**Response:**
```json
{
  "success": true,
  "scripts": {
    "scenarios": ["epic-arthur-vs-ragnar.hots"],
    "tests": ["parser-comparison.hots", "temporal-stress-test.hots"],
    "demos": ["simple-game.hots"]
  }
}
```

## 📊 **Performance & Benchmarking**

### **Benchmark Parsers**
```http
POST /scripts/benchmark
Content-Type: application/json

{
  "scriptFile": "tests/parser-comparison.hots"
}
```

**Response:**
```json
{
  "success": true,
  "benchmark": {
    "regex": {
      "time": 180,
      "opsPerSec": 1333,
      "success": true,
      "successCount": 15,
      "errorCount": 0
    },
    "antlr4": {
      "time": 220,
      "opsPerSec": 1220,
      "success": true,
      "successCount": 15,
      "errorCount": 0
    }
  }
}
```

### **Health Check**
```http
GET /health
```

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "activeGames": 5,
  "totalQueries": 1247,
  "uptime": "2h 15m 30s"
}
```

## 🌀 **Temporal Mechanics**

### **Create ψ-State**
```http
POST /psi-states
Content-Type: application/json

{
  "gameId": 123,
  "psiId": "ψ001",
  "expression": "⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))",
  "deltaT": 2,
  "targetX": 20,
  "targetY": 20,
  "ownerHero": "Arthur"
}
```

### **Collapse ψ-State**
```http
POST /psi-states/{psiId}/collapse
Content-Type: application/json

{
  "gameId": 123
}
```

**Response:**
```json
{
  "success": true,
  "psiId": "ψ001",
  "actionResult": "Hero Arthur moved to (20,20)",
  "message": "ψ state ψ001 collapsed successfully"
}
```

### **List Active ψ-States**
```http
GET /games/{gameId}/psi-states
```

## 🏰 **Hero Management**

### **Create Hero**
```http
POST /heroes
Content-Type: application/json

{
  "gameId": 123,
  "name": "Arthur",
  "class": "KNIGHT",
  "level": 1,
  "positionX": 10,
  "positionY": 10
}
```

### **Move Hero**
```http
POST /heroes/{heroName}/move
Content-Type: application/json

{
  "gameId": 123,
  "x": 15,
  "y": 15
}
```

### **Get Hero Details**
```http
GET /games/{gameId}/heroes/{heroName}
```

**Response:**
```json
{
  "name": "Arthur",
  "position": {"x": 15, "y": 15},
  "health": 100,
  "maxHealth": 100,
  "temporalEnergy": 50,
  "maxTemporalEnergy": 100,
  "movementPoints": 3,
  "level": 5,
  "experience": 1250,
  "inventory": ["Excalibur", "Shield of Time"],
  "skills": ["Attack", "Defense", "Temporal Mastery"]
}
```

## 🎪 **Advanced Features**

### **Battle System**
```http
POST /battles
Content-Type: application/json

{
  "gameId": 123,
  "attacker": "Arthur",
  "defender": "Ragnar",
  "battleType": "HERO_VS_HERO"
}
```

### **Artifact Usage**
```http
POST /artifacts/use
Content-Type: application/json

{
  "gameId": 123,
  "artifactName": "TemporalSword",
  "heroName": "Arthur",
  "targetX": 20,
  "targetY": 20
}
```

### **Building Construction**
```http
POST /buildings
Content-Type: application/json

{
  "gameId": 123,
  "buildingType": "CASTLE",
  "x": 25,
  "y": 25,
  "owner": "Player1"
}
```

## 🚨 **Error Handling**

### **Standard Error Response**
```json
{
  "success": false,
  "error": "Game not found with ID: 999",
  "errorCode": "GAME_NOT_FOUND",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### **Common Error Codes**
- `GAME_NOT_FOUND` - Game ID doesn't exist
- `HERO_NOT_FOUND` - Hero name doesn't exist
- `INVALID_POSITION` - Coordinates out of bounds
- `PARSER_ERROR` - Script parsing failed
- `PSI_STATE_CONFLICT` - ψ-state collision detected
- `INSUFFICIENT_RESOURCES` - Not enough resources for action

## 🎯 **Parser Selection**

### **REGEX Parser (Default)**
```http
# All requests use REGEX parser by default
POST /execute
```

### **ANTLR4 Parser**
```http
POST /execute
Content-Type: application/json

{
  "gameId": 123,
  "command": "HERO: Arthur",
  "parser": "antlr4"
}
```

### **Switch Parser Globally**
```bash
# Environment variable
export HEROES_PARSER_USE_ANTLR=true

# JVM property
-Dheroes.parser.use.antlr=true
```

## 📈 **Rate Limiting**

- **Standard API**: 100 requests/minute
- **Script Execution**: 10 requests/minute
- **Benchmark**: 5 requests/minute

## 🔒 **Authentication**

Currently, the API is open for development. Production deployment will include:
- JWT token authentication
- Role-based access control
- API key management

## 🎮 **WebSocket Support**

Real-time game updates via WebSocket:
```javascript
const ws = new WebSocket('ws://localhost:8080/ws/game/123');
ws.onmessage = (event) => {
  const gameUpdate = JSON.parse(event.data);
  // Handle real-time game state changes
};
```

## 📚 **Additional Resources**

- **🎪 Game Features**: [Complete Feature List](FEATURES.md)
- **🚀 Installation**: [Setup Guide](INSTALLATION.md)
- **🧪 Testing**: [Test Suite Documentation](TESTING.md)
- **🎯 Script Language**: [.hots File Reference](SCRIPTING.md)

## 🎉 **Getting Started**

1. **Start the backend**: `./start-all.sh`
2. **Test the API**: `curl http://localhost:8080/api/temporal/health`
3. **Run a script**: Use the `/scripts/execute` endpoint
4. **Check the game state**: Use the `/games/{gameId}` endpoint

🔧 **API is production-ready with comprehensive error handling and performance optimization!** 