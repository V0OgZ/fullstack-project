# 🤝 Contributing to Heroes Reforged

Thank you for your interest in contributing to Heroes Reforged! This document provides guidelines for contributing to this revolutionary asynchronous strategy game.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Use the [GitHub Issues](https://github.com/V0OgZ/heroes-reforged/issues) to report bugs
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
git clone https://github.com/YOUR_USERNAME/heroes-reforged.git
cd heroes-reforged

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

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
mvn test
mvn jacoco:report
```

### Manual Testing
- Test all game features
- Verify ZFC calculations
- Check political system balance
- Test responsive design
- Verify performance

## 📋 Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow coding standards
   - Add tests
   - Update documentation

3. **Test Thoroughly**
   - Run all tests
   - Test manually
   - Check performance

4. **Submit Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots if UI changes
   - Request review

5. **Review Process**
   - Address feedback
   - Update as needed
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
- Accessibility improvements
- Bug fixes

### Medium Priority
- New political events
- Additional advisor types
- UI/UX enhancements
- Documentation improvements

### Low Priority
- New game modes
- Advanced features
- Experimental mechanics
- Community features

## 🌍 Internationalization

We're working on multi-language support:
- English (primary)
- French (secondary)
- More languages welcome

### Translation Guidelines
- Use translation keys
- Maintain context
- Consider cultural differences
- Test with different text lengths

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

- Check the [FAQ](https://github.com/V0OgZ/heroes-reforged/wiki/FAQ)
- Ask in [Discussions](https://github.com/V0OgZ/heroes-reforged/discussions)
- Contact [@V0OgZ](https://github.com/V0OgZ)

---

**Thank you for contributing to Heroes Reforged!** 🎮✨ 