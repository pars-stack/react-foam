# Changelog

All notable changes to React Foam will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added
- Initial release of React Foam
- `createStore` function for creating lightweight stores
- TypeScript-first implementation with excellent type inference
- Selective subscriptions with automatic re-render optimization
- Zero dependencies beyond React
- `computed` utility for derived state values
- `batch` utility for batching multiple updates
- Comprehensive test suite with 100% coverage
- Complete documentation and examples
- Support for both CommonJS and ES modules
- React 16.8+ compatibility

### Features
- **Extremely Lightweight**: ~2KB minified and gzipped
- **Zero Dependencies**: No external dependencies beyond React
- **TypeScript First**: Built with TypeScript from the ground up
- **Minimal Boilerplate**: Simple API that can be learned in 5 minutes
- **Performance Optimized**: Automatic re-render optimization
- **Immutable State**: Built-in immutable state model
- **React-like**: Feels like a natural extension of React hooks

### Performance
- Selective subscriptions prevent unnecessary re-renders
- Efficient listener system with minimal overhead
- Automatic cleanup of listeners on component unmount
- Reference equality checks for state updates
- Optimized for both development and production builds

### Developer Experience
- Excellent TypeScript support with automatic type inference
- Clear error messages and warnings
- Comprehensive documentation with examples
- Jest test utilities and testing best practices
- ESLint configuration for code quality
- Rollup build system for optimal bundle size

## [Unreleased]

### Planned for v1.1
- Browser DevTools extension for debugging stores
- Optional persistence plugin for localStorage/sessionStorage
- React Native specific optimizations
- Performance monitoring utilities

### Planned for v1.2
- Optional middleware system for advanced use cases
- Time travel debugging capabilities
- Store composition utilities
- Advanced selector utilities

### Long-term Roadmap
- Framework agnostic core for Vue, Svelte support
- Enhanced SSR support and hydration
- React 18+ concurrent features integration
- Advanced IDE support and tooling

