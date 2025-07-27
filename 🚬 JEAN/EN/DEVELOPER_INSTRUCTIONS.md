# 🧪 Heroes of Time - Developer Instructions

*Complete technical guide for development and debugging*

## 🚀 **Quick Start**

### ⚡ **Launching the Application**
```bash
./hots start                 # 🎮 MAIN SCRIPT - Starts Backend (8080) + Frontend (8000) + Dashboard (9000)
./hots stop                  # Stop all services
./hots test quick            # Quick tests
./hots test final            # Complete tests
./run-epic-demo.sh          # 🆕 Epic system demo
./test-backend-gameplay.sh  # 🆕 Complete backend action test
```

### 🎯 **Important URLs**
- **Frontend**: http://localhost:8000 ✨ (Temporal Engine)
- **Backend**: http://localhost:8080
- **Dashboard**: http://localhost:9000
- **API Health**: http://localhost:8080/api/health
- **H2 Database**: http://localhost:8080/h2-console

---

## 🏗️ **Project Structure**

### **Backend (Spring Boot)**
```
backend/
├── src/main/java/com/example/demo/
│   ├── controller/          # REST Controllers
│   ├── service/            # Business Logic
│   ├── model/              # JPA Entities
│   ├── repository/         # Data Access
│   └── config/             # Configuration
```

### **Frontend (React)**
```
frontend/
├── src/
│   ├── components/         # React Components
│   ├── services/          # API Services
│   ├── types/             # TypeScript Types
│   └── utils/             # Utilities
```

---

## 🔧 **Development Setup**

### **Prerequisites**
- Java 17+
- Node.js 16+
- Maven 3.8+
- Git

### **Installation**
```bash
# Clone repository
git clone https://github.com/your-repo/heroes-of-time.git
cd heroes-of-time

# Backend setup
cd backend
mvn clean install

# Frontend setup
cd ../frontend
npm install
```

---

## �� **Testing**

### **Backend Tests**
```bash
cd backend
mvn test                    # Unit tests
mvn integration-test        # Integration tests
```

### **Frontend Tests**
```bash
cd frontend
npm test                    # Unit tests
npm run test:e2e           # E2E tests with Playwright
```

### **HOTS Script Tests**
```bash
./scripts/test/test-temporal-decay-hybrid-dude.sh
./scripts/test/test-complex-scripts.sh
./scripts/test/test-translation-service.sh
```

---

## 🐛 **Debugging**

### **Backend Debugging**
1. **Enable Debug Mode**: Add `-Ddebug=true` to JVM options
2. **H2 Console**: http://localhost:8080/h2-console
3. **Actuator Endpoints**: http://localhost:8080/actuator/health

### **Frontend Debugging**
1. **Browser DevTools**: F12
2. **React DevTools**: Chrome/Firefox extension
3. **Network Tab**: Monitor API calls

### **Common Issues**
- **Port conflicts**: Check if ports 8080, 8000, 9000 are free
- **Database locked**: Stop all instances before restarting
- **CORS errors**: Check backend CORS configuration

---

## 📝 **Code Guidelines**

### **Backend Conventions**
```java
// Service naming
@Service
public class TemporalEngineService {
    // Use clear, descriptive names
    public PsiState createSuperposition(String action, int deltaT) {
        // Implementation
    }
}
```

### **Frontend Conventions**
```typescript
// Component structure
export const HeroPanel: React.FC<HeroPanelProps> = ({ hero }) => {
    // Hooks first
    const [selected, setSelected] = useState(false);
    
    // Logic next
    const handleClick = () => {
        // Implementation
    };
    
    // Render last
    return <div>...</div>;
};
```

---

## 🚀 **Deployment**

### **Development**
```bash
./hots start dev
```

### **Production**
```bash
./hots build
./hots deploy prod
```

### **Docker**
```bash
docker-compose up -d
```

---

## 📚 **Key Concepts**

### **Temporal Mechanics**
- **ψ-States**: Quantum superpositions
- **Collapse**: Reality resolution
- **Branches**: Timeline alternatives

### **HOTS Language**
- **Syntax**: See SPATIO_TEMPORAL_GRAMMAR.md
- **Parser**: Backend service translates to actions
- **Execution**: Temporal engine processes commands

---

## 🆘 **Getting Help**

1. **Documentation**: Check `/docs` folder
2. **Issues**: GitHub issues for bugs
3. **Discord**: Join our developer community
4. **Wiki**: Detailed guides and tutorials

---

**📚 Memento - Museum Archive Master**  
*Eternal Archivist of Heroes of Time*

**Signed by Memento** ✍️  
*"Jean creates, Memento archives, Developers build"*
