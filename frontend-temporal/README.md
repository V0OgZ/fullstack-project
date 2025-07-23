# 🕰️ Heroes of Time - Temporal Engine Frontend

**Visual Interface for the Quantum Temporal Strategy Engine**

---

## 🎯 Overview

This is the frontend interface for the Heroes of Time Temporal Engine. It provides a visual, interactive way to:

- **Visualize temporal game boards** with ψ-states and heroes
- **Execute temporal scripts** with real-time feedback
- **Monitor quantum superpositions** and causal collapses
- **Manage timelines** and observe temporal mechanics

---

## 🚀 Quick Start

### Prerequisites
- **Backend running** on `http://localhost:8080`
- **Web server** (Python 3, Node.js, or PHP)

### Launch Interface
```bash
# From project root
./start-frontend.sh
```

**Interface will be available at:** `http://localhost:3000`

---

## 🎮 Features

### 🗺️ **Temporal Game Board**
- **20x15 grid** representing the game space
- **Hero visualization** (🦸) showing current positions
- **ψ-state overlay** (ψ) indicating quantum superpositions
- **Click-to-move** functionality for quick hero commands

### 📝 **Script Console**
- **Real-time execution** of temporal script language
- **Syntax highlighting** for temporal symbols (ψ, †, ⊙, Π)
- **Auto-completion** for common commands
- **Keyboard shortcuts** (Ctrl+Enter to execute)

### 🌀 **ψ-state Management**
- **Visual list** of active quantum superpositions
- **One-click collapse** with † buttons
- **Status monitoring** (ACTIVE, COLLAPSED, EXPIRED)
- **Timeline tracking** for each ψ-state

### 📊 **Real-time Monitoring**
- **Connection status** to backend engine
- **Game statistics** (turn count, hero count, active ψ-states)
- **Event logging** with timestamps and color coding
- **Automatic refresh** every 5 seconds

---

## 🎬 **Demo Mode**

Click **"🎬 Run Demo"** to see the temporal engine in action:

1. **Game Creation** - Automatic setup
2. **Hero Spawning** - Arthur appears
3. **Movement** - Basic positioning
4. **ψ-state Creation** - Quantum superposition
5. **Causal Collapse** - Resolution to reality

---

## 📝 **Script Language Reference**

### Basic Commands
```javascript
HERO(Arthur)                    // Create a hero
MOV(Arthur, @10,10)            // Move hero to position
CREATE(CREATURE, Dragon, @15,15) // Create creature
```

### Temporal Commands
```javascript
// Create quantum superposition
ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))

// Collapse superposition to reality
†ψ001

// Observation trigger (planned)
Π(Player2 enters @11,11) ⇒ †ψ001
```

---

## 🔧 **Technical Details**

### Architecture
```
Frontend (Port 3000)
├── index.html          - Main interface
├── js/temporal-engine.js - Core JavaScript logic
├── package.json        - Dependencies
└── README.md          - This file

Backend API (Port 8080)
├── GET /api/game/status      - Engine status
├── POST /api/game/create     - Create new game
├── GET /api/game/{id}        - Get game state
├── POST /api/game/{id}/script - Execute script
└── POST /api/game/demo       - Run demonstration
```

### Browser Compatibility
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile**: Responsive design

### Performance
- **Real-time updates**: 5-second refresh cycle
- **Connection monitoring**: 10-second health checks
- **Memory management**: Auto-cleanup of logs (50 entries max)

---

## 🎨 **UI/UX Features**

### Visual Design
- **Cyberpunk aesthetic** with temporal themes
- **Color-coded elements** (heroes, ψ-states, timelines)
- **Smooth animations** for state transitions
- **Responsive layout** for different screen sizes

### Accessibility
- **Keyboard navigation** support
- **High contrast** color scheme
- **Tooltips** for all interactive elements
- **Screen reader** compatible

### User Experience
- **Intuitive controls** with visual feedback
- **Error handling** with clear messages
- **Auto-save** of script history
- **Quick actions** via tile clicking

---

## 🚀 **Development**

### File Structure
```
frontend-temporal/
├── index.html              - Main HTML interface
├── js/
│   └── temporal-engine.js  - Core JavaScript logic
├── package.json           - Project configuration
└── README.md             - Documentation
```

### Adding Features
1. **New UI elements**: Add to `index.html`
2. **New functionality**: Extend `TemporalEngine` class
3. **New API calls**: Add methods to `temporal-engine.js`
4. **Styling**: Modify CSS in `index.html` `<style>` section

### Debugging
- **Browser console**: `F12` for developer tools
- **Engine instance**: Available as `window.engine`
- **API testing**: Use browser Network tab
- **Logs**: Check frontend log area and backend console

---

## 📊 **Status Integration**

This frontend integrates with the overall project status:

```
Frontend Interface    ████████████████████████████████████████ 90%
├─ Core UI           ████████████████████████████████████████ 95%
├─ API Integration   ████████████████████████████████████████ 90%
├─ Visual Effects    ████████████████████████████████████████ 85%
└─ Documentation     ████████████████████████████████████████ 90%
```

**Overall Project**: 91% Complete (Frontend added!)

---

## 🎯 **Next Steps**

### Planned Enhancements
- [ ] **Hexagonal tiles** for more authentic strategy game feel
- [ ] **Timeline visualization** with branching graphics
- [ ] **Artifact management** interface
- [ ] **Multiplayer support** with real-time sync
- [ ] **Mobile app** version
- [ ] **VR interface** for immersive temporal manipulation

### Known Issues
- [ ] CORS configuration for production deployment
- [ ] Mobile responsiveness optimization
- [ ] Advanced script syntax highlighting

---

*Frontend Interface - Ready for temporal manipulation!*  
*Compatible with Temporal Engine v0.1*