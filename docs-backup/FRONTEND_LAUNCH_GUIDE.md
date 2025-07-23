# 🚀 Heroes of Time Frontend - Launch Guide

## ⚡ Quick Launch

```bash
# 1. Start the complete system
./start-frontend.sh

# 2. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

---

## 🎮 **What You'll See**

### 🖥️ **Interface Layout**
```
┌─────────────────────────────────────────────────────────┐
│  🕰️ Heroes of Time - Temporal Engine        [●] Connected  │
├───────────┬─────────────────────────┬─────────────────────┤
│🎮 Game    │  🗺️ Temporal Game Board │ 🌀 Active ψ-states  │
│Control    │                         │                     │
│           │  ████████████████████   │ ψ001: MOV(Arthur)   │
│Game ID: 1 │  ████████████████████   │ Target: (11,11)     │
│Turn: 0    │  ████🦸██████████████   │ [† Collapse]        │
│ψ-states:1 │  ████████████████████   │                     │
│Heroes: 1  │                         │ 📋 Event Log        │
│           │  📝 Script Console      │ [16:45] ✅ Connected │
│🎲 New Game│  ψ001: ⊙(Δt+1 @11,11   │ [16:45] 🎮 Game #1  │
│🎬 Demo    │  ⟶ MOV(Arthur, @11,11)) │ [16:46] ⚡ Script OK │
│           │  [⚡ Execute Script]     │                     │
└───────────┴─────────────────────────┴─────────────────────┘
```

---

## 🎯 **Step-by-Step Tutorial**

### Step 1: Launch & Connect
1. Run `./start-frontend.sh`
2. Wait for "✅ Backend is ready!" message
3. Open `http://localhost:3000` in browser
4. Check status indicator shows "Connected" (green dot)

### Step 2: Create Your First Game
1. Click **"🎲 New Game"** button
2. Observe Game ID updates (e.g., "Game ID: 1")
3. Check log shows "🎮 New game created"

### Step 3: Spawn a Hero
1. In Script Console, type: `HERO(Arthur)`
2. Click **"⚡ Execute Script"** or press `Ctrl+Enter`
3. Check log shows "✅ Script executed successfully"
4. Hero count updates to "Heroes: 1"

### Step 4: Move the Hero
1. Type: `MOV(Arthur, @10,10)`
2. Execute the script
3. Watch the game board - a 🦸 icon appears at position (10,10)
4. Click any tile to auto-generate movement commands

### Step 5: Create a ψ-state (Quantum Superposition)
1. Type: `ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))`
2. Execute the script
3. Watch the right panel - "Active ψ-states" shows your quantum state
4. A purple ψ symbol appears on the game board at (11,11)
5. Active ψ-states counter updates

### Step 6: Collapse the ψ-state
1. **Option A**: Type `†ψ001` and execute
2. **Option B**: Click the **"† Collapse"** button in the ψ-state panel
3. Watch Arthur move to the new position (11,11)
4. The ψ symbol disappears from the board
5. Log shows collapse result

### Step 7: Try the Demo
1. Click **"🎬 Run Demo"** for automated demonstration
2. Watch the complete temporal mechanics in action
3. Observe multiple ψ-states and collapses

---

## 🔧 **Advanced Features**

### 🎯 **Click-to-Move**
- Click any tile on the board
- Movement command auto-generated in script console
- Execute to move your hero instantly

### ⌨️ **Keyboard Shortcuts**
- `Ctrl+Enter`: Execute script
- `F12`: Open browser developer tools for debugging

### 🔄 **Real-time Updates**
- Game state refreshes every 5 seconds
- Connection checked every 10 seconds
- Automatic UI synchronization

### 📊 **Monitoring**
- **Green dot**: Connected to backend
- **Red dot**: Connection lost
- **Event log**: Timestamped activity feed
- **Statistics**: Live game metrics

---

## 🌀 **Temporal Script Examples**

### Basic Commands
```javascript
HERO(Arthur)                    // Spawn hero
HERO(Merlin)                   // Spawn second hero
MOV(Arthur, @5,5)              // Move to position
MOV(Merlin, @15,15)            // Move second hero
```

### Quantum Mechanics
```javascript
// Create multiple superpositions
ψ001: ⊙(Δt+1 @6,6 ⟶ MOV(Arthur, @6,6))
ψ002: ⊙(Δt+2 @7,7 ⟶ MOV(Arthur, @7,7))
ψ003: ⊙(Δt+1 @16,16 ⟶ MOV(Merlin, @16,16))

// Collapse specific states
†ψ001
†ψ003

// Create creatures
CREATE(CREATURE, Dragon, @12,12)
```

---

## 🚨 **Troubleshooting**

### ❌ "Disconnected" Status
- **Check backend**: Is Spring Boot running on port 8080?
- **Start backend**: `cd backend && mvn spring-boot:run`
- **Check ports**: Ensure 8080 and 3000 are available

### ❌ "No active game" Error
- Click **"🎲 New Game"** first
- Wait for "Game created successfully" message
- Check Game ID is not "-"

### ❌ Scripts Not Executing
- Verify connection status (green dot)
- Check script syntax (see examples above)
- Look at event log for error messages

### ❌ Game Board Empty
- Create a hero first: `HERO(Arthur)`
- Move hero to visible position: `MOV(Arthur, @10,10)`
- Refresh page if needed

### ❌ Frontend Won't Start
- **Install Python 3**: `sudo apt install python3`
- **Alternative**: Open `frontend-temporal/index.html` directly in browser
- **Check port**: Ensure port 3000 is not in use

---

## 🎉 **Success Indicators**

### ✅ **Everything Working**
- Status shows "Connected" with green dot
- Game ID shows a number (not "-")
- Scripts execute without errors
- Heroes appear on game board
- ψ-states create purple overlays
- Event log shows successful operations

### 🎮 **Ready for Advanced Play**
- Multiple heroes spawned and moving
- ψ-states created and collapsed successfully
- Real-time monitoring active
- Demo mode working perfectly

---

## 🚀 **Next Steps**

Once the basic interface is working:

1. **Experiment** with complex temporal scripts
2. **Create** multiple timelines and conflicts
3. **Test** the limits of the quantum engine
4. **Prepare** for temporal artifacts implementation
5. **Design** multiplayer scenarios

---

*🕰️ Welcome to temporal manipulation!*  
*The quantum realm awaits your commands...*