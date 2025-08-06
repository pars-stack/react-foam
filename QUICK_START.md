# React Foam Quick Start

Get up and running with React Foam in less than 5 minutes!

## Installation

```bash
npm install react-foam
# or
yarn add react-foam
# or
pnpm add react-foam
```

## Basic Usage

### 1. Create a Store

```typescript
import { createStore } from 'react-foam';

// Define your state type (optional but recommended)
interface CounterState {
  count: number;
  step: number;
}

// Create a store with initial state
const useCounterStore = createStore<CounterState>({
  count: 0,
  step: 1
});
```

### 2. Use in Components

```typescript
import React from 'react';

function Counter() {
  // Get the entire state
  const { count, step } = useCounterStore();

  // Update state with setState
  const increment = () => {
    useCounterStore.setState(state => ({
      ...state,
      count: state.count + state.step
    }));
  };

  const setStep = (newStep: number) => {
    useCounterStore.setState(state => ({ ...state, step: newStep }));
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => setStep(Number(e.target.value))} 
      />
      <button onClick={increment}>+{step}</button>
    </div>
  );
}
```

### 3. Optimize with Selectors

```typescript
function OptimizedCounter() {
  // Only re-renders when count changes, not when step changes
  const count = useCounterStore(state => state.count);
  
  return <div>Count: {count}</div>;
}
```

### 4. Access State Outside Components

```typescript
// Get current state without subscribing
const currentState = useCounterStore.getState();
console.log('Current count:', currentState.count);

// Update state from anywhere
useCounterStore.setState({ count: 100, step: 5 });
```

## Advanced Features

### Multiple Stores

```typescript
const useUserStore = createStore({
  name: '',
  email: '',
  isLoggedIn: false
});

const useThemeStore = createStore({
  theme: 'light' as 'light' | 'dark',
  fontSize: 'medium' as 'small' | 'medium' | 'large'
});

function App() {
  const user = useUserStore();
  const theme = useThemeStore();
  
  return (
    <div className={theme.theme}>
      <h1>Welcome, {user.name || 'Guest'}</h1>
    </div>
  );
}
```

### Computed Values

```typescript
import { computed } from 'react-foam';

const useCartStore = createStore({
  items: [] as { price: number; quantity: number }[]
});

// Create computed value
const getTotalPrice = computed(useCartStore, state =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

function Cart() {
  const total = getTotalPrice();
  return <div>Total: ${total.toFixed(2)}</div>;
}
```

### Async Operations

```typescript
const useDataStore = createStore({
  data: null,
  loading: false,
  error: null
});

const fetchData = async () => {
  useDataStore.setState(state => ({ ...state, loading: true, error: null }));
  
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    useDataStore.setState({ data, loading: false, error: null });
  } catch (error) {
    useDataStore.setState(state => ({ 
      ...state, 
      loading: false, 
      error: error.message 
    }));
  }
};
```

## Best Practices

### ✅ Do

```typescript
// Use functional updates for complex changes
useStore.setState(state => ({ ...state, count: state.count + 1 }));

// Use selectors to optimize re-renders
const count = useStore(state => state.count);

// Keep stores focused on specific domains
const useUserStore = createStore({ /* user data */ });
const useCartStore = createStore({ /* cart data */ });

// Use TypeScript interfaces
interface State { count: number; name: string; }
const useStore = createStore<State>({ count: 0, name: '' });
```

### ❌ Don't

```typescript
// Don't mutate state directly
const state = useStore.getState();
state.count++; // This won't trigger re-renders!

// Don't create stores inside components
function Component() {
  const useStore = createStore({ count: 0 }); // Wrong!
  // ...
}

// Don't over-subscribe
const state = useStore(); // Re-renders on any change
// Instead use: const count = useStore(state => state.count);
```

## Common Patterns

### Action Creators

```typescript
const useCounterStore = createStore({ count: 0 });

const counterActions = {
  increment: () => useCounterStore.setState(state => ({ count: state.count + 1 })),
  decrement: () => useCounterStore.setState(state => ({ count: state.count - 1 })),
  reset: () => useCounterStore.setState({ count: 0 }),
  setCount: (count: number) => useCounterStore.setState({ count })
};

// Usage
counterActions.increment();
counterActions.setCount(42);
```

### Loading States

```typescript
const useApiStore = createStore({
  data: null,
  loading: false,
  error: null
});

const apiActions = {
  async fetchData() {
    useApiStore.setState(state => ({ ...state, loading: true, error: null }));
    try {
      const data = await api.getData();
      useApiStore.setState({ data, loading: false, error: null });
    } catch (error) {
      useApiStore.setState(state => ({ 
        ...state, 
        loading: false, 
        error: error.message 
      }));
    }
  }
};
```

### Form Handling

```typescript
const useFormStore = createStore({
  values: { name: '', email: '' },
  errors: {},
  isSubmitting: false
});

const formActions = {
  setValue: (field: string, value: string) => {
    useFormStore.setState(state => ({
      ...state,
      values: { ...state.values, [field]: value },
      errors: { ...state.errors, [field]: null } // Clear error
    }));
  },
  
  setError: (field: string, error: string) => {
    useFormStore.setState(state => ({
      ...state,
      errors: { ...state.errors, [field]: error }
    }));
  },
  
  reset: () => {
    useFormStore.setState({
      values: { name: '', email: '' },
      errors: {},
      isSubmitting: false
    });
  }
};
```

## Next Steps

- Read the full [README](README.md) for comprehensive documentation
- Check out the [examples](examples/) directory for more complex use cases
- See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Visit our [website](https://react-foam.dev) for more resources

## Need Help?

- 📖 [Full Documentation](README.md)
- 💬 [GitHub Discussions](https://github.com/react-foam/react-foam/discussions)
- 🐛 [Report Issues](https://github.com/react-foam/react-foam/issues)
- 💡 [Feature Requests](https://github.com/react-foam/react-foam/issues)

Happy coding with React Foam! 🎉

