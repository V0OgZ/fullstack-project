# 🤝 Contributing to Heroes of Time

Thank you for your interest in contributing to **Heroes of Time**! This document provides guidelines for contributing to this modern turn-based strategy game.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Use [GitHub Issues](https://github.com/V0OgZ/Heroes-of-Time/issues) to report bugs
- Include detailed reproduction steps
- Provide browser/OS information
- Include screenshots or videos if relevant
- Test with the latest version first

### 💡 Feature Requests
- Check existing issues before creating new ones
- Explain the use case and benefits clearly
- Consider the impact on game balance
- Provide mockups or examples if possible
- Tag with appropriate labels

### 🔧 Code Contributions
- Fork the repository
- Create a feature branch from `main`
- Follow the coding standards
- Add comprehensive tests
- Update documentation
- Submit a pull request

### 📚 Documentation
- Improve existing documentation
- Add examples and tutorials
- Fix typos and formatting
- Translate to other languages

## 🚀 Development Setup

### Prerequisites
- **Node.js** 16+ (LTS recommended)
- **Java** 17+ (OpenJDK recommended)
- **Maven** 3.6+
- **Git** 2.0+

### Quick Start
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Heroes-of-Time.git
cd Heroes-of-Time

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
mvn clean install

# Start development servers
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm start
```

### Verify Setup
- Backend: http://localhost:8080/api/health
- Frontend: http://localhost:3000
- Game should load and be playable

## 📝 Development Guidelines

### Code Style

#### Backend (Java)
```java
// Use descriptive names
public class GameService {
    
    // Document complex methods
    /**
     * Processes a hero move action with validation
     * @param heroId The ID of the hero to move
     * @param position The target position
     * @return ActionResult containing success/failure
     */
    public ActionResult moveHero(String heroId, Position position) {
        // Implementation
    }
}
```

#### Frontend (TypeScript)
```typescript
// Use interfaces for type safety
interface GameState {
    currentTurn: number;
    players: Player[];
    gameMap: HexTile[][];
}

// Use descriptive component names
const EnhancedScenarioSelector: React.FC = () => {
    // Component logic
};
```

### Testing Requirements

#### Backend Tests
```java
@SpringBootTest
class GameServiceTest {
    
    @Test
    void shouldCreateGameSuccessfully() {
        // Arrange
        GameConfig config = new GameConfig();
        
        // Act
        Game game = gameService.createGame(config);
        
        // Assert
        assertThat(game.getId()).isNotNull();
        assertThat(game.getStatus()).isEqualTo(GameStatus.WAITING);
    }
}
```

#### Frontend Tests
```typescript
describe('GameStore', () => {
    test('should load game correctly', async () => {
        // Arrange
        const gameId = 'test-game-1';
        
        // Act
        await gameStore.loadGame(gameId);
        
        // Assert
        expect(gameStore.currentGame).toBeDefined();
        expect(gameStore.currentGame?.id).toBe(gameId);
    });
});
```

#### E2E Tests
```typescript
describe('Game Flow', () => {
    it('should allow complete game playthrough', () => {
        cy.visit('/');
        cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
        cy.get('[data-testid="start-game-button"]').click();
        cy.url().should('include', '/game/');
        // Continue testing game flow
    });
});
```

### Git Workflow

#### Branch Naming
- **Features**: `feature/hero-movement-system`
- **Bug Fixes**: `fix/castle-building-bug`
- **Documentation**: `📖 docs/api-documentation`
- **Refactoring**: `refactor/game-service-cleanup`

#### Commit Messages
```bash
# Good commit messages
feat: add hero movement validation
fix: resolve castle building resource bug
docs: update API documentation
test: add comprehensive combat tests

# Bad commit messages
fix bug
update code
changes
```

#### Pull Request Process
1. **Create Branch**: `git checkout -b feature/your-feature`
2. **Make Changes**: Implement your feature
3. **Add Tests**: Ensure comprehensive test coverage
4. **Update Docs**: Update relevant documentation
5. **Run Tests**: Verify all tests pass locally
6. **Commit**: Use conventional commit messages
7. **Push**: `git push origin feature/your-feature`
8. **Create PR**: Use the GitHub interface
9. **Code Review**: Address reviewer feedback
10. **Merge**: Squash and merge when approved

## 🧪 Testing Strategy

### Test Categories

#### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution (< 1 second each)
- High coverage (> 80%)

#### Integration Tests
- Test component interactions
- Use real database (H2 in-memory)
- Test API endpoints
- Verify data persistence

#### E2E Tests
- Test complete user workflows
- Use Cypress for browser automation
- Test critical game paths
- Verify UI interactions

### Running Tests
```bash
# Backend tests
cd backend
mvn test

# Frontend unit tests
cd frontend
npm test

# E2E tests
cd frontend
npx cypress run

# All tests
./test-full-suite.sh
```

## 📋 Issue Guidelines

### Bug Reports
Use this template:
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 91, Firefox 89]
- Game Version: [e.g., v1.0.0]

**Screenshots**
If applicable, add screenshots.
```

### Feature Requests
Use this template:
```markdown
**Feature Summary**
Brief description of the feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternative Solutions**
Other approaches considered.

**Additional Context**
Any other relevant information.
```

## 🎮 Game Development Guidelines

### Game Balance
- Consider impact on all game modes
- Test with different player counts
- Maintain strategic depth
- Avoid overpowered combinations

### User Experience
- Intuitive interface design
- Clear visual feedback
- Responsive interactions
- Accessibility considerations

### Performance
- Optimize for 60 FPS gameplay
- Minimize memory usage
- Efficient network communication
- Fast loading times

## 🏆 Recognition

### Contributors
We recognize contributors through:
- GitHub contributor graph
- Release notes mentions
- Special contributor badges
- Community Discord roles

### Types of Contributions
- **Code** - Features, bug fixes, optimizations
- **Documentation** - Guides, API docs, tutorials
- **Testing** - Bug reports, test cases, QA
- **Design** - UI/UX, graphics, animations
- **Community** - Support, moderation, feedback

## 📞 Getting Help

### Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Discord** - Real-time chat and support
- **Email** - Direct contact for sensitive issues

### Response Times
- **Critical Bugs** - Within 24 hours
- **Feature Requests** - Within 1 week
- **Documentation** - Within 3 days
- **General Questions** - Within 2 days

## 📄 License

By contributing to Heroes of Time, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make Heroes of Time better! 🎮** 