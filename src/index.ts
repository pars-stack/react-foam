import { useCallback, useRef, useSyncExternalStore } from "react";

// --- TYPE DEFINITIONS ---

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

// --- CORE STORE IMPLEMENTATION ---

/**
 * Creates a new React Foam store with the given initial state.
 * @param initialState - The initial state of the store.
 * @returns A hook that can be used to access and update the store state.
 */
export function createStore<T extends object>(initialState: T): StoreHook<T> {
  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = (): T => state;

  const setState: SetState<T> = (updater) => {
    const nextState =
      typeof updater === "function"
        ? (updater as StateUpdater<T>)(state)
        : updater;

    if (nextState !== state) {
      state = nextState;
      listeners.forEach((listener) => listener(state));
    }
  };

  const subscribe = (listener: Listener<T>): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  function useStore(): T;
  function useStore<R>(selector: Selector<T, R>): R;
  function useStore<R>(selector?: Selector<T, R>): T | R {
    const selectorRef = useRef(selector);
    selectorRef.current = selector;

    const getSnapshot = useCallback(() => {
      const currentSelector = selectorRef.current;
      const currentState = getState();
      return currentSelector ? currentSelector(currentState) : currentState;
    }, []);

    return useSyncExternalStore(subscribe, getSnapshot);
  }

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;
  useStore.destroy = destroy;

  return useStore as StoreHook<T>;
}

// --- UTILITY FUNCTIONS ---

/**
 * Creates a memoized selector that automatically tracks property access.
 * This selector will only recompute its result if the tracked properties
 * in the state have changed, preventing re-renders for components that
 * derive new objects or arrays from state.
 *
 * @param selector The selector function to memoize.
 * @returns A new, memoized selector for use with `useStore`.
 * @example const derivedState = useStore(memo(state => ({ name: state.user.name })));
 */
export function memo<T extends object, R>(
  selector: (state: T) => R
): (state: T) => R {
  let hasRun = false;
  let lastState: T | null = null;
  let lastResult: R | null = null;
  let trackedKeys: (keyof T)[] = [];

  return (state: T): R => {
    if (!hasRun) {
      const tracked = new Set<keyof T>();
      const proxy = new Proxy(state, {
        get(target, key) {
          tracked.add(key as keyof T);
          return Reflect.get(target, key);
        },
      });

      lastResult = selector(proxy);
      trackedKeys = Array.from(tracked);
      lastState = state;
      hasRun = true;
      return lastResult;
    }

    // Subsequent runs: check if any of the tracked properties have changed.
    const hasChanged = trackedKeys.some(
      (key) => lastState![key] !== state[key]
    );

    if (!hasChanged) {
      // If nothing has changed, return the cached result immediately.
      return lastResult!;
    }

    // Otherwise, re-run the selector and update the cache.
    lastResult = selector(state);
    lastState = state;
    return lastResult;
  };
}

/**
 * Creates a non-reactive function that computes a value from a store's state.
 * @param store The store hook to read from.
 * @param selector The function to compute the value.
 * @returns A function that returns the latest computed value when called.
 */
export function computed<T extends object, R>(
  store: StoreHook<T>,
  selector: Selector<T, R>
): () => R {
  return () => selector(store.getState());
}

// --- EXPORTED TYPES ---

export type { Selector, StateUpdater, SetState, StoreHook };
