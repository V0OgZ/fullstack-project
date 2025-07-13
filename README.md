# 🎮 Heroes of Time

**A modern turn-based strategy game inspired by Heroes of Might and Magic III, featuring innovative temporal mechanics and asynchronous gameplay.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/V0OgZ/Heroes-of-Time)
[![Frontend](https://img.shields.io/badge/frontend-React%20TypeScript-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **Java** 17+
- **Maven** 3.6+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/V0OgZ/Heroes-of-Time.git
cd Heroes-of-Time

# Start Backend (Terminal 1)
cd backend
mvn spring-boot:run

# Start Frontend (Terminal 2) 
cd frontend
npm install
npm start
```

**Access the game:** http://localhost:3000

## 🎯 Game Features

### 🏰 Two Epic Game Modes
- **🗡️ Classic Conquest** - Traditional Heroes gameplay with modern enhancements
- **⚡ Mystique Conquest** - Advanced mode with temporal mechanics and ZFC system

### 🎮 Core Systems
- **Castle Building** - 8 unique castle types with specialized units
- **Hero Development** - Level progression with skills and artifacts  
- **Tactical Combat** - Hexagonal battlefield with strategic positioning
- **Magic System** - 31+ magical items with unique effects
- **Multiplayer** - Real-time sessions with WebSocket communication
- **AI Opponents** - Intelligent computer players with different personalities

### 🔮 Innovative Features
- **ZFC (Zone of Temporal Causality)** - Revolutionary asynchronous gameplay
- **Temporal Objects** - Reality-altering magical items
- **Shadow Actions** - Preview other players' moves
- **Political System** - Strategic decision-making with consequences

## 🏗️ Technical Architecture

### Backend (Spring Boot)
- **Port:** 8080
- **Database:** H2 (dev) / PostgreSQL (prod)
- **WebSocket:** STOMP over SockJS
- **Testing:** 44 comprehensive tests

### Frontend (React + TypeScript)
- **Port:** 3000
- **State Management:** Zustand
- **Styling:** CSS Modules
- **Testing:** Jest + Cypress E2E

## 📁 Project Structure

```
Heroes-of-Time/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/      # Java source code
│   ├── src/test/           # Backend tests
│   └── pom.xml             # Maven configuration
├── frontend/               # React frontend
│   ├── src/                # TypeScript source
│   ├── cypress/            # E2E tests
│   └── package.json        # NPM configuration
├── client/                 # Legacy frontend (deprecated)
└── docs/                   # Documentation
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
cd frontend
npx cypress open  # Interactive mode
npx cypress run   # Headless mode
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
mvn clean package -DskipTests
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by **Heroes of Might and Magic III** by New World Computing
- Built with modern web technologies
- Community contributions and feedback

---

**🎮 Ready to conquer time itself? [Start playing now!](http://localhost:3000)**
