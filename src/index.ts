import { useEffect, useRef, useState, useCallback } from 'react';

// Type definitions
type Listener<T> = (state: T) => void;
type Selector<T, R> = (state: T) => R;
type StateUpdater<T> = (state: T) => T;
type SetState<T> = (updater: StateUpdater<T> | T) => void;

interface Store<T> {
  getState: () => T;
  setState: SetState<T>;
  subscribe: (listener: Listener<T>) => () => void;
  destroy: () => void;
}

interface StoreHook<T> extends Store<T> {
  (): T;
  <R>(selector: Selector<T, R>): R;
}

/**
 * Creates a new React Foam store with the given initial state
 * @param initialState - The initial state of the store
 * @returns A hook that can be used to access and update the store state
 */
export function createStore<T>(initialState: T): StoreHook<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  // Core store methods
  const getState = (): T => state;

  const setState: SetState<T> = (updater) => {
    const newState = typeof updater === 'function' 
      ? (updater as StateUpdater<T>)(state)
      : updater;
    
    if (newState !== state) {
      state = newState;
      listeners.forEach(listener => listener(state));
    }
  };

  const subscribe = (listener: Listener<T>): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  // Create the store object
  const store: Store<T> = {
    getState,
    setState,
    subscribe,
    destroy
  };

  // The hook function with overloads for selector support
  function useStore(): T;
  function useStore<R>(selector: Selector<T, R>): R;
  function useStore<R>(selector?: Selector<T, R>): T | R {
    const [, forceUpdate] = useState({});
    const selectorRef = useRef(selector);
    const stateRef = useRef<T | R>(selector ? selector(store.getState()) : store.getState());
    const hasSelector = selector !== undefined;

    // Update selector ref
    selectorRef.current = selector;

    // Force re-render function
    const triggerUpdate = useCallback(() => {
      forceUpdate({});
    }, []);

    // Subscribe to store changes
    useEffect(() => {
      const unsubscribe = store.subscribe((newState) => {
        const newValue = hasSelector && selectorRef.current
          ? selectorRef.current(newState)
          : newState;

        // Only trigger re-render if the selected value has changed
        if (newValue !== stateRef.current) {
          stateRef.current = newValue;
          triggerUpdate();
        }
      });

      return unsubscribe;
    }, [hasSelector, triggerUpdate]);

    // Compute current value (without useMemo to ensure it updates)
    const currentState = store.getState();
    const currentValue = hasSelector && selectorRef.current 
      ? selectorRef.current(currentState)
      : currentState;

    // Update ref with current value
    stateRef.current = currentValue;

    return currentValue;
  }

  // Attach store methods to the hook
  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;
  useStore.destroy = destroy; 
  
  return useStore as StoreHook<T>;
}

// Utility function for creating computed values
export function computed<T, R>(
  store: StoreHook<T>,
  selector: Selector<T, R>
): () => R {
  return () => selector(store.getState());
}

// --- EXPORTED TYPES ---

