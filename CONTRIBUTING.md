# Contributing to React Foam

Thank you for your interest in contributing to React Foam! We welcome contributions from the community and are excited to see what you'll bring to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome newcomers and help them get started
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone has different experience levels
- **Be Professional**: Keep discussions focused on the project

## Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- npm, yarn, or pnpm
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/react-foam.git
   cd react-foam
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/react-foam/react-foam.git
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests to ensure everything is working:
   ```bash
   npm test
   ```

3. Start development mode:
   ```bash
   npm run dev
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

### Project Structure

```
react-foam/
├── src/                 # Source code
│   ├── index.ts        # Main library entry point
│   └── index.test.ts   # Test files
├── examples/           # Example applications
├── tests/              # Test utilities and setup
├── dist/               # Built files (generated)
├── docs/               # Documentation
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
├── rollup.config.js    # Build configuration
├── jest.config.js      # Test configuration
└── README.md           # Main documentation
```

### Available Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Start development mode with watch
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

## Contributing Guidelines

### Philosophy

React Foam is built on these core principles:

1. **Simplicity First**: Keep the API minimal and intuitive
2. **Performance**: Every change should maintain or improve performance
3. **Zero Dependencies**: Avoid adding external dependencies
4. **TypeScript**: All code must be written in TypeScript
5. **Testing**: Maintain 100% test coverage
6. **Documentation**: Document all public APIs and changes

### What We're Looking For

**High Priority Contributions:**
- Bug fixes
- Performance improvements
- Documentation improvements
- Test coverage improvements
- TypeScript type improvements

**Medium Priority Contributions:**
- New utility functions that align with our philosophy
- Developer experience improvements
- Build system improvements
- Example applications

**Please Discuss First:**
- New major features
- Breaking changes
- Architectural changes
- New dependencies

### What We're Not Looking For

- Features that significantly increase bundle size
- Complex APIs that go against our simplicity principle
- Features that require external dependencies
- Features that duplicate existing React functionality

## Pull Request Process

### Before You Start

1. Check existing issues and PRs to avoid duplicates
2. For major changes, open an issue first to discuss
3. Make sure you understand the project philosophy
4. Ensure you have time to see the PR through to completion

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards
3. Add or update tests as needed
4. Update documentation if necessary
5. Ensure all tests pass and linting is clean

### Commit Guidelines

We follow [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add computed values utility
fix: prevent memory leak in store subscriptions
docs: update API reference for createStore
test: add tests for selector optimization
```

### Submitting Your PR

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request on GitHub
3. Fill out the PR template completely
4. Link any related issues
5. Request review from maintainers

### PR Requirements

Your PR must:
- [ ] Pass all existing tests
- [ ] Include tests for new functionality
- [ ] Maintain or improve code coverage
- [ ] Pass linting checks
- [ ] Include documentation updates
- [ ] Have a clear description of changes
- [ ] Follow our coding standards
- [ ] Be based on the latest `main` branch

## Issue Guidelines

### Before Opening an Issue

1. Search existing issues to avoid duplicates
2. Check the documentation and examples
3. Try to reproduce the issue with a minimal example
4. Gather relevant information (versions, environment, etc.)

### Bug Reports

Include:
- React Foam version
- React version
- Node.js version
- Operating system
- Browser (if applicable)
- Minimal reproduction case
- Expected behavior
- Actual behavior
- Error messages or stack traces

### Feature Requests

Include:
- Clear description of the feature
- Use cases and motivation
- Proposed API (if applicable)
- Alternatives considered
- Impact on bundle size
- Backward compatibility considerations

### Questions

For questions:
- Check the documentation first
- Search existing issues
- Use GitHub Discussions for general questions
- Use issues only for specific problems

## Testing

### Writing Tests

- All new features must include tests
- Tests should cover both happy path and edge cases
- Use descriptive test names
- Group related tests in `describe` blocks
- Mock external dependencies

### Test Structure

```typescript
describe('Feature Name', () => {
  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Test implementation
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- index.test.ts
```

### Coverage Requirements

- Maintain 100% code coverage
- All branches must be tested
- All functions must be tested
- All edge cases should be covered

## Documentation

### Code Documentation

- Use JSDoc comments for all public APIs
- Include examples in documentation
- Document complex algorithms or logic
- Keep comments up to date with code changes

### README Updates

When updating the README:
- Keep examples simple and focused
- Ensure all code examples work
- Update table of contents if needed
- Check for typos and grammar

### API Documentation

- Document all parameters and return types
- Include usage examples
- Note any breaking changes
- Explain the reasoning behind design decisions

## Release Process

Releases are handled by maintainers:

1. Version bump following semantic versioning
2. Update CHANGELOG.md
3. Create GitHub release with release notes
4. Publish to npm
5. Update documentation site

## Getting Help

If you need help:

1. Check the documentation
2. Search existing issues
3. Ask in GitHub Discussions
4. Reach out to maintainers

## Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes for significant contributions
- Invited to join the maintainers team for exceptional contributions

Thank you for contributing to React Foam! 🎉

