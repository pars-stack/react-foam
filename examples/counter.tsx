import React from 'react';
import { createStore } from '../src/index';

// Define the counter state type
interface CounterState {
  count: number;
  step: number;
}

// Create the counter store
const useCounterStore = createStore<CounterState>({
  count: 0,
  step: 1
});

// Counter component using the full state
const Counter: React.FC = () => {
  const { count, step } = useCounterStore();

  const increment = () => {
    useCounterStore.setState(state => ({
      ...state,
      count: state.count + state.step
    }));
  };

  const decrement = () => {
    useCounterStore.setState(state => ({
      ...state,
      count: state.count - state.step
    }));
  };

  const reset = () => {
    useCounterStore.setState(state => ({
      ...state,
      count: 0
    }));
  };

  const setStep = (newStep: number) => {
    useCounterStore.setState(state => ({
      ...state,
      step: newStep
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>React Foam Counter Example</h2>
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        Count: <strong>{count}</strong>
      </div>
      <div style={{ margin: '10px 0' }}>
        Step: 
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={increment} style={{ margin: '0 5px', padding: '10px 15px' }}>
          +{step}
        </button>
        <button onClick={decrement} style={{ margin: '0 5px', padding: '10px 15px' }}>
          -{step}
        </button>
        <button onClick={reset} style={{ margin: '0 5px', padding: '10px 15px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

// Component that only subscribes to count (demonstrates selector optimization)
const CountDisplay: React.FC = () => {
  // Only re-renders when count changes, not when step changes
  const count = useCounterStore(state => state.count);

  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #ccc', 
      margin: '10px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Optimized Count Display</h3>
      <p>This component only re-renders when count changes: <strong>{count}</strong></p>
      <small>Try changing the step value - this component won't re-render!</small>
    </div>
  );
};

// Main app component
const CounterApp: React.FC = () => {
  return (
    <div>
      <Counter />
      <CountDisplay />
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f4f8' }}>
        <h3>External State Access</h3>
        <button 
          onClick={() => {
            const currentState = useCounterStore.getState();
            alert(`Current count: ${currentState.count}, Current step: ${currentState.step}`);
          }}
          style={{ padding: '10px 15px' }}
        >
          Get Current State
        </button>
      </div>
    </div>
  );
};

export default CounterApp;

