# 🚀 Heroes of Time - Installation & Development Guide

## 📋 **Prerequisites**

- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Maven 3.8+** (for build)
- **Git** (for version control)

## 🎮 **Quick Start (Recommended)**

### 1. **One-Command Launch**
```bash
# Clone repository
git clone https://github.com/V0OgZ/Heroes-of-Time.git
cd Heroes-of-Time

# Start everything at once
./start-all.sh
```

### 2. **Access Interfaces**
- **🎮 Classic UI**: http://localhost:8000
- **🌀 Temporal UI**: http://localhost:5173
- **🔧 API Backend**: http://localhost:8080

### 3. **Stop Everything**
```bash
./stop-all.sh
```

## 🔧 **Manual Installation**

### **Backend Setup**
```bash
# Install dependencies and start backend
cd backend
mvn clean install
mvn spring-boot:run

# Backend will run on port 8080
```

### **Frontend Setup**
```bash
# Classic UI (port 8000)
cd frontend
python3 -m http.server 8000

# Temporal UI (port 5173)
cd frontend-temporal
python3 -m http.server 5173
```

## 🧪 **Testing**

### **Complete Test Suite**
```bash
# Run all tests with both parsers
./test-complete-comparison.sh

# Quick demo
./test-game-scripts.sh

# Backend unit tests
cd backend && mvn test
```

### **Individual Components**
```bash
# Test specific parser
mvn test -Dheroes.parser.use.antlr=false  # REGEX
mvn test -Dheroes.parser.use.antlr=true   # ANTLR4

# Test specific script
curl -X POST http://localhost:8080/api/temporal/⚙️ scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "regex"}'
```

## 🎯 **Development**

### **Project Structure**
```
Heroes-of-Time/
├── 🖥️ backend/                    # Spring Boot API
│   ├── src/main/java/         # Java source
│   ├── src/main/resources/    # Scripts & config
│   └── src/test/java/         # Unit tests
├── 🌐 frontend/                  # Classic UI
├── frontend-temporal/         # Temporal UI
├── 📖 docs/                      # Documentation
└── ⚙️ scripts/                   # Test scripts
```

### **API Development**
```bash
# Backend with auto-reload
cd backend
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev"

# API Documentation
curl http://localhost:8080/api/temporal/health
```

### **Parser Configuration**
```bash
# Use REGEX parser (default)
export HEROES_PARSER_USE_ANTLR=false

# Use ANTLR4 parser
export HEROES_PARSER_USE_ANTLR=true
```

## 📊 **Performance Monitoring**

### **Benchmark Both Parsers**
```bash
# Complete performance comparison
./test-complete-comparison.sh

# Results in: RAPPORT_COMPLET_COMPARAISON.md
```

### **Individual Performance**
```bash
# Benchmark specific scripts
curl -X POST http://localhost:8080/api/temporal/⚙️ scripts/benchmark \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "🧪 tests/temporal-stress-test.hots"}'
```

## 🐛 **Troubleshooting**

### **Common Issues**

**Backend won't start:**
```bash
# Check Java version
java -version

# Clean and rebuild
cd backend
mvn clean install
```

**Frontend connection errors:**
```bash
# Check if backend is running
curl http://localhost:8080/api/temporal/health

# Check ports
netstat -an | grep 8080
```

**Parser conflicts:**
```bash
# Reset parser configuration
unset HEROES_PARSER_USE_ANTLR
mvn clean compile
```

### **Debug Mode**
```bash
# Enable verbose logging
export SPRING_PROFILES_ACTIVE=dev

# Run with debug
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

## 🔄 **Update Process**

### **Pull Latest Changes**
```bash
git pull origin main
cd backend
mvn clean install
./start-all.sh
```

### **Database Reset**
```bash
# H2 database auto-resets on restart
# No manual action needed
```

## 📚 **Next Steps**

- **🎪 Game Features**: [Complete Feature List](FEATURES.md)
- **🔧 API Reference**: [REST API Documentation](API.md)
- **🧪 Testing Guide**: [Testing Documentation](TESTING.md)
- **🎮 Gameplay**: [How to Play](GAMEPLAY.md)

## 🎉 **Success!**

If everything is working, you should see:
- ✅ Backend running on port 8080
- ✅ Classic UI on port 8000
- ✅ Temporal UI on port 5173
- ✅ All tests passing

🎯 **Ready to master time and space!** 