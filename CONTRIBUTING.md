# Contributing to TrueFans CONNECT™

Thank you for your interest in contributing to TrueFans CONNECT™! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.1+
- Git
- Supabase account (for database features)
- Basic knowledge of Next.js, React, and TypeScript

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/truefans-geoconnect.git
   cd truefans-geoconnect
   ```

2. **Install Dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database Setup**
   ```bash
   bunx supabase start
   bunx supabase db push
   ```

5. **Start Development**
   ```bash
   bun run dev
   ```

## 📋 Development Guidelines

### Code Style

We use the following tools to maintain code quality:

- **TypeScript**: Strict mode enabled
- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Tailwind CSS**: For styling

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat(auth): add magic link authentication
fix(geolocation): resolve accuracy calculation bug
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(api): simplify payment processing logic
test(e2e): add donation flow tests
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

## 🧪 Testing

### Running Tests

```bash
# Unit tests
bun run test

# E2E tests
bun run test:e2e

# Coverage report
bun run test:coverage
```

### Writing Tests

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database interactions
- **E2E Tests**: Test complete user workflows

Example unit test:
```typescript
import { describe, it, expect } from 'vitest'
import { formatDistance } from '@/lib/utils/format'

describe('formatDistance', () => {
  it('formats meters correctly', () => {
    expect(formatDistance(500)).toBe('500m')
    expect(formatDistance(1500)).toBe('1.5km')
  })
})
```

## 🏗️ Project Structure

```
app/                    # Next.js App Router pages
components/             # Reusable React components
  ├── ui/              # Base UI components
  ├── layout/          # Layout components
  └── feature/         # Feature-specific components
lib/                   # Utility libraries
  ├── supabase/        # Database client and utilities
  ├── hooks/           # Custom React hooks
  ├── utils/           # Helper functions
  └── types/           # TypeScript definitions
```

## 🎯 Contribution Areas

### High Priority

- **Geolocation Accuracy**: Improve venue detection algorithms
- **Real-time Features**: Enhance live show tracking
- **Mobile Experience**: Optimize for mobile devices
- **Performance**: Reduce bundle size and improve loading times

### Medium Priority

- **Accessibility**: Improve WCAG compliance
- **Internationalization**: Add multi-language support
- **Testing**: Increase test coverage
- **Documentation**: Improve code documentation

### Feature Requests

- **Artist Tools**: Enhanced artist dashboard features
- **Social Features**: Fan interaction capabilities
- **Analytics**: Advanced reporting and insights
- **Integrations**: Additional music platform connections

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to recreate the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, device information
6. **Screenshots**: If applicable

Use our bug report template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 12.0]
- Device: [e.g. iPhone 12]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

For new features, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** the feature would solve
3. **Propose a solution** with implementation details
4. **Consider alternatives** and explain why your solution is best
5. **Provide mockups** or examples if applicable

## 🔄 Pull Request Process

### Before Submitting

1. **Create an issue** to discuss the change
2. **Fork the repository** and create a feature branch
3. **Write tests** for your changes
4. **Update documentation** if needed
5. **Run the test suite** to ensure nothing breaks

### PR Requirements

- [ ] Tests pass (`bun run test`)
- [ ] E2E tests pass (`bun run test:e2e`)
- [ ] TypeScript compiles (`bun run type-check`)
- [ ] Code is formatted (`bun run lint:fix`)
- [ ] Documentation is updated
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass
- [ ] Documentation updated
```

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority
- `priority: medium` - Medium priority
- `priority: low` - Low priority

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at conduct@truefans.ai.

## 📞 Getting Help

- **Discord**: [TrueFans Community](https://discord.gg/truefans)
- **Email**: dev@truefans.ai
- **Issues**: [GitHub Issues](https://github.com/truefans/geoconnect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/truefans/geoconnect/discussions)

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Annual contributor highlights
- Special Discord roles and badges

Thank you for contributing to TrueFans CONNECT™! 🎵