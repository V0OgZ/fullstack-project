# 🤝 Contributing to Heroes of Time

Thank you for your interest in contributing to Heroes of Time! This document provides guidelines for contributing to this revolutionary asynchronous strategy game.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Use the [GitHub Issues](https://github.com/V0OgZ/Heroes-of-Time/issues) to report bugs
- Include detailed reproduction steps
- Provide browser/OS information
- Include screenshots if relevant

### 💡 Feature Requests
- Check existing issues before creating new ones
- Explain the use case and benefits
- Consider the impact on the ZFC system
- Provide mockups or examples if possible

### 🔧 Code Contributions
- Fork the repository
- Create a feature branch
- Follow the coding standards
- Add tests for new features
- Update documentation

## 🚀 Development Setup

### Prerequisites
- Node.js 16+
- Java 17+ (SDKMAN recommended)
- Maven 3.6+
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Heroes-of-Time.git
cd Heroes-of-Time

# Install dependencies
cd frontend && npm install
cd ../backend && mvn clean install

# Start development servers
# Terminal 1: Backend
cd backend && mvn spring-boot:run

# Terminal 2: Frontend
cd frontend && npm start
```

## 📝 Coding Standards

### Frontend (React/TypeScript)
- Use TypeScript for all new files
- Follow React Hooks patterns
- Use Zustand for state management
- Implement responsive design
- Add proper error handling

### Backend (Spring Boot/Java)
- Follow Spring Boot conventions
- Use proper REST API design
- Implement proper error handling
- Add unit tests for business logic
- Follow hexagonal architecture

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns
- Keep functions small and focused
- Use proper TypeScript types

## 🎮 Game Design Guidelines

### ZFC System
- Maintain backward compatibility
- Consider performance implications
- Test with multiple players
- Ensure visual clarity
- Document algorithm changes

### Political System
- Balance advisor personalities
- Create meaningful choices
- Consider long-term consequences
- Maintain historical accuracy
- Test decision trees

### UI/UX
- Maintain the fantasy theme
- Ensure accessibility
- Test on different screen sizes
- Provide clear feedback
- Use consistent animations

## 🧪 Comprehensive Testing Requirements

### Backend Testing (44 Tests)
```bash
cd backend

# Run all backend tests
mvn test

# Run specific test class
mvn test -Dtest=GameControllerTest

# Generate test coverage report
mvn jacoco:report
```

**Required Test Coverage:**
- **GameController**: All REST endpoints must have tests
- **UnitController**: CRUD operations and localization
- **MultiplayerController**: WebSocket and session management
- **Services**: Business logic with >90% coverage
- **Integration**: End-to-end API testing

### Frontend Testing (26+ Cypress Tests)
```bash
cd frontend

# Run all E2E tests
npm run test:e2e

# Open Cypress test runner
npx cypress open

# Run specific test file
npx cypress run --spec "cypress/e2e/09-corrected-comprehensive-tests.cy.js"
```

**Required Test Coverage:**
- **Screen Tests**: All major UI components
- **Language Tests**: French, English, Russian switching
- **Map Tests**: Classic and Mystique functionality
- **Performance Tests**: Load testing and error handling
- **Accessibility Tests**: Keyboard navigation and WCAG compliance

### Test Requirements for Contributions
- **New Backend Features**: Must include comprehensive unit tests
- **New Frontend Features**: Must include Cypress E2E tests
- **API Changes**: Must update existing tests
- **UI Changes**: Must pass accessibility tests
- **Performance**: Must not degrade existing benchmarks

## 📋 Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow coding standards
   - Add comprehensive tests
   - Update documentation

3. **Test Thoroughly**
   - Run all 44 backend tests: `mvn test`
   - Run all 26+ frontend tests: `npm run test:e2e`
   - Test manually across devices
   - Check performance benchmarks

4. **Quality Gates**
   - All tests must pass
   - Test coverage must not decrease
   - Performance benchmarks must be maintained
   - Accessibility standards must be met

5. **Submit Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots if UI changes
   - Include test results summary

6. **Review Process**
   - Address feedback
   - Update tests as needed
   - Maintain clean commit history

## 🏷️ Commit Messages

Use conventional commits:
```
feat: add new political event system
fix: resolve ZFC calculation bug
docs: update API documentation
style: improve code formatting
refactor: optimize canvas rendering
test: add unit tests for advisor logic
```

## 🎯 Priority Areas

### High Priority
- Performance optimizations
- Mobile responsiveness
- Accessibility improvements (WCAG 2.1 AA)
- Bug fixes
- Test coverage improvements

### Medium Priority
- New political events
- Additional advisor types
- UI/UX enhancements
- Documentation improvements
- Multi-language support

### Low Priority
- New game modes
- Advanced features
- Experimental mechanics
- Community features

## 🌍 Internationalization

We support multiple languages:
- English (primary)
- French (secondary)
- Russian (implemented)
- More languages welcome

### Translation Guidelines
- Use translation keys
- Maintain context
- Consider cultural differences
- Test with different text lengths
- Add Cypress tests for new languages

## 🔧 Development Tools

### Recommended IDE Setup
- **VS Code** with extensions:
  - TypeScript Hero
  - ES7+ React/Redux/React-Native snippets
  - Prettier
  - ESLint
  - GitLens

### Debug Configuration
```bash
# Frontend debugging
npm run start:debug

# Backend debugging
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
```

## 📞 Communication

### Discord Server
Join our community: [Discord Invite](#)

### GitHub Discussions
Use for:
- Feature discussions
- Architecture decisions
- Community questions
- Showcase contributions

## 🏆 Recognition

Contributors will be:
- Added to the credits
- Mentioned in release notes
- Invited to beta testing
- Given special Discord roles

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- Check the [FAQ](https://github.com/V0OgZ/Heroes-of-Time/wiki/FAQ)
- Ask in [Discussions](https://github.com/V0OgZ/Heroes-of-Time/discussions)
- Contact [@V0OgZ](https://github.com/V0OgZ)

---

**Thank you for contributing to Heroes of Time!** 🎮✨ 

*The future of strategy gaming starts with your contributions.* 🔮 