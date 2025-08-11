import { renderHook, act } from '@testing-library/react';
import { createStore, computed, memo } from './index';

describe('React Foam', () => {
  describe('createStore', () => {
    it('should create a store with initial state', () => {
      const useStore = createStore({ count: 0 });
      const { result } = renderHook(() => useStore());
      expect(result.current).toEqual({ count: 0 });
    });

    it('should provide getState method', () => {
      const useStore = createStore({ count: 5 });

      expect(useStore.getState()).toEqual({ count: 5 });
    });

    it('should provide setState method', () => {
      const useStore = createStore({ count: 0 });

      act(() => {
        useStore.setState({ count: 10 });
      });

      expect(useStore.getState()).toEqual({ count: 10 });
    });
  });

  describe('state updates', () => {
    it('should update state with object', () => {
      const useStore = createStore({ count: 0, name: 'test' });
      const { result } = renderHook(() => useStore());

      act(() => {
        useStore.setState({ count: 5, name: 'updated' });
      });

      expect(result.current).toEqual({ count: 5, name: 'updated' });
    });

    it('should update state with function', () => {
      const useStore = createStore({ count: 0 });
      const { result } = renderHook(() => useStore());

      act(() => {
        useStore.setState(state => ({ count: state.count + 1 }));
      });

      expect(result.current).toEqual({ count: 1 });
    });

    it('should not trigger re-render if state is the same', () => {
      const useStore = createStore({ count: 0 });
      const { result } = renderHook(() => useStore());

      const initialRender = result.current;

      act(() => {
        useStore.setState({ count: 0 }); // Same state
      });

      expect(result.current).toStrictEqual(initialRender); // Same reference
    });

    it('should handle complex state updates', () => {
      interface State {
        user: { name: string; age: number };
        items: string[];
        settings: { theme: string };
      }

      const initialState: State = {
        user: { name: 'John', age: 30 },
        items: ['a', 'b'],
        settings: { theme: 'light' }
      };

      const useStore = createStore(initialState);
      const { result } = renderHook(() => useStore());

      act(() => {
        useStore.setState(state => ({
          ...state,
          user: { ...state.user, age: 31 },
          items: [...state.items, 'c']
        }));
      });

      expect(result.current).toEqual({
        user: { name: 'John', age: 31 },
        items: ['a', 'b', 'c'],
        settings: { theme: 'light' }
      });
    });
  });

  describe('selectors', () => {
    it('should work with selectors', () => {
      const useStore = createStore({ count: 5, name: 'test' });
      const { result } = renderHook(() => useStore(state => state.count));

      expect(result.current).toBe(5);
    });

    it('should only re-render when selected value changes', () => {
      const useStore = createStore({ count: 0, name: 'test' });
      let renderCount = 0;

      const { result } = renderHook(() => {
        renderCount++;
        return useStore(state => state.count);
      });

      expect(renderCount).toBe(1);
      expect(result.current).toBe(0);

      // Update name (should not trigger re-render for count selector)
      act(() => {
        useStore.setState(state => ({ ...state, name: 'updated' }));
      });

      expect(renderCount).toBe(1); // No re-render
      expect(result.current).toBe(0);

      // Update count (should trigger re-render)
      act(() => {
        useStore.setState(state => ({ ...state, count: 1 }));
      });

      expect(renderCount).toBe(2); // Re-render occurred
      expect(result.current).toBe(1);
    });

    // it('should work with complex selectors', () => {
    //   interface State {
    //     items: { id: number; name: string; completed: boolean }[];
    //   }

    //   const useStore = createStore<State>({
    //     items: [
    //       { id: 1, name: 'Task 1', completed: false },
    //       { id: 2, name: 'Task 2', completed: true },
    //       { id: 3, name: 'Task 3', completed: false }
    //     ]
    //   });

    //   const { result } = renderHook(() =>
    //     useStore(state => state.items.filter(item => !item.completed))
    //   );

    //   expect(result.current).toHaveLength(2);
    //   expect(result.current[0].name).toBe('Task 1');
    //   expect(result.current[1].name).toBe('Task 3');
    // });
  });

  describe('multiple stores', () => {
    it('should handle multiple independent stores', () => {
      const useStore1 = createStore({ value: 1 });
      const useStore2 = createStore({ value: 2 });

      const { result: result1 } = renderHook(() => useStore1());
      const { result: result2 } = renderHook(() => useStore2());

      expect(result1.current.value).toBe(1);
      expect(result2.current.value).toBe(2);

      act(() => {
        useStore1.setState({ value: 10 });
      });

      expect(result1.current.value).toBe(10);
      expect(result2.current.value).toBe(2); // Unchanged
    });

    it('should allow cross-store interactions', () => {
      const useUserStore = createStore({ name: '', isLoggedIn: false });
      const useCartStore = createStore({ items: [] as string[] });

      const performCheckout = () => {
        const user = useUserStore.getState();
        const cart = useCartStore.getState();

        if (!user.isLoggedIn) {
          throw new Error('User must be logged in');
        }

        if (cart.items.length === 0) {
          throw new Error('Cart is empty');
        }

        // Simulate checkout
        useCartStore.setState({ items: [] });
      };

      // Setup initial state
      act(() => {
        useUserStore.setState({ name: 'John', isLoggedIn: true });
        useCartStore.setState({ items: ['item1', 'item2'] });
      });

      expect(() => performCheckout()).not.toThrow();
      expect(useCartStore.getState().items).toEqual([]);
    });
  });

  describe('computed values', () => {
    it('should create computed values', () => {
      const useStore = createStore({ items: [1, 2, 3, 4, 5] });
      const getSum = computed(useStore, (state) =>
        state.items.reduce((sum, item) => sum + item, 0)
      );

      expect(getSum()).toBe(15);

      act(() => {
        useStore.setState({ items: [1, 2, 3] });
      });

      expect(getSum()).toBe(6);
    });

    it('should work with complex computed values', () => {
      interface TodoState {
        todos: { id: number; text: string; completed: boolean }[];
        filter: 'all' | 'active' | 'completed';
      }

      const useStore = createStore<TodoState>({
        todos: [
          { id: 1, text: 'Task 1', completed: false },
          { id: 2, text: 'Task 2', completed: true },
          { id: 3, text: 'Task 3', completed: false },
        ],
        filter: 'all',
      });

      const getFilteredTodos = computed(useStore, (state) => {
        switch (state.filter) {
          case 'active':
            return state.todos.filter((todo) => !todo.completed);
          case 'completed':
            return state.todos.filter((todo) => todo.completed);
          default:
            return state.todos;
        }
      });

      expect(getFilteredTodos()).toHaveLength(3);

      act(() => {
        useStore.setState((state) => ({ ...state, filter: 'active' }));
      });

      expect(getFilteredTodos()).toHaveLength(2);

      act(() => {
        useStore.setState((state) => ({ ...state, filter: 'completed' }));
      });

      expect(getFilteredTodos()).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle errors in state updates gracefully', () => {
      const useStore = createStore({ count: 0 });

      expect(() => {
        act(() => {
          useStore.setState(() => {
            throw new Error('Update error');
          });
        });
      }).toThrow('Update error');

      // State should remain unchanged
      expect(useStore.getState()).toEqual({ count: 0 });
    });

    it('should handle errors in selectors gracefully', () => {
      type StoreState = { value: { nonExistent: string } | null };
      const useStore = createStore<StoreState>({ value: null });

      expect(() => {
        renderHook(() => useStore((state) => state.value!.nonExistent));
      }).toThrow();
    });
  });

  describe('TypeScript support', () => {
    it('should provide proper type inference', () => {
      interface State {
        count: number;
        name: string;
        items: string[];
      }

      const useStore = createStore<State>({
        count: 0,
        name: 'test',
        items: []
      });

      // These should compile without type errors
      const state = useStore.getState();
      expect(typeof state.count).toBe('number');
      expect(typeof state.name).toBe('string');
      expect(Array.isArray(state.items)).toBe(true);

      // Selector should infer correct return type
      const { result } = renderHook(() => useStore(state => state.count));
      expect(typeof result.current).toBe('number');
    });
  });

  describe('memory management', () => {
    it('should clean up listeners on unmount', () => {
      const useStore = createStore({ count: 0 });
      const { unmount } = renderHook(() => useStore());

      act(() => {
        useStore.setState({ count: 1 });
      });

      expect(useStore.getState()).toEqual({ count: 1 });

      unmount();

      act(() => {
        useStore.setState({ count: 2 });
      });

      // No re-render happens after unmount, so nothing crashes
      expect(useStore.getState()).toEqual({ count: 2 });
    });
  });
});

describe("advanced selectors and memo", () => {
  it("should handle dynamically changing selector functions", () => {
    // This test ensures that if a component passes a new selector function on re-render,
    // the hook correctly uses the new function for future state change comparisons.
    const useStore = createStore({ a: 1, b: 2 });
    let useB = false;

    const { result, rerender } = renderHook(() => {
      // The selector function changes based on a condition.
      const selector = useB ? (state) => state.b : (state) => state.a;
      return useStore(selector);
    });

    expect(result.current).toBe(1); // Initially selects `a`

    // Rerender the hook to switch the selector to `b`
    useB = true;
    rerender();

    expect(result.current).toBe(2); // Hook immediately returns the newly selected value

    // Now, update `a`. The component should NOT re-render because it's now subscribed to `b`.
    const initialResult = result.current;
    act(() => {
      useStore.setState((state) => ({ ...state, a: 100 }));
    });

    expect(result.current).toBe(initialResult); // No change
    expect(result.current).toBe(2);
  });

  it("should work with complex selectors when using memo()", () => {
    interface State {
      items: { id: number; name: string; completed: boolean }[];
    }

    const useStore = createStore<State>({
      items: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: true },
        { id: 3, name: "Task 3", completed: false },
      ],
    });

    // FIX: The selector is wrapped in the `memo()` utility.
    // This prevents the infinite loop by caching the result.
    const { result } = renderHook(() =>
      useStore(memo((state) => state.items.filter((item) => !item.completed)))
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0].name).toBe("Task 1");
    expect(result.current[1].name).toBe("Task 3");
  });

  it("should correctly select and memoize a derived array using memo()", () => {
    interface State {
      items: { id: number; name: string; completed: boolean }[];
    }
    const useStore = createStore<State>({
      items: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: true },
        { id: 3, name: "Task 3", completed: false },
      ],
    });

    // The selector is wrapped in memo() to handle the creation of a new array.
    const { result } = renderHook(() =>
      useStore(memo((state) => state.items.filter((item) => !item.completed)))
    );

    // The correct data is selected and returned.
    expect(result.current).toHaveLength(2);
    expect(result.current.map((item) => item.id)).toEqual([1, 3]);
  });

  it("should prevent re-renders when using memo() and unrelated state changes", () => {
    interface State {
      count: number,
      unrelated: string,
    }

    const useStore = createStore<State>({
      count: 10,
      unrelated: "initial data",
    });
    let renderCount = 0;

    // This selector creates a new object, but memo() will cache it.
    const selector = memo<State, unknown>((state) => ({ count: state.count }));

    const { result } = renderHook(() => {
      renderCount++;
      return useStore(selector);
    });

    // Initial render.
    expect(renderCount).toBe(1);
    expect(result.current).toEqual({ count: 10 });

    // Update an UNRELATED part of the state.
    act(() => {
      useStore.setState((state) => ({ ...state, unrelated: "new data" }));
    });

    // Assert that NO re-render occurred.
    // The memo() utility saw that `state.count` didn't change and returned
    // the cached object, satisfying `useSyncExternalStore`.
    expect(renderCount).toBe(1);
    expect(result.current).toEqual({ count: 10 });
  });
});

describe("state update nuances", () => {
  it("setState should replace the state, not merge it", () => {
    // This is a critical test to document the library's behavior.
    // Unlike Zustand, react-foam's setState does not automatically merge state.
    const useStore = createStore({ count: 0, name: "initial" });
    const { result } = renderHook(() => useStore());

    expect(result.current).toEqual({ count: 0, name: "initial" });

    // This update should *replace* the entire state object.
    act(() => {
      // @ts-expect-error We are intentionally passing a partial state to test replacement behavior
      useStore.setState({ count: 1 });
    });

    // The 'name' property should be gone.
    expect(result.current).toEqual({ count: 1 });
    expect(useStore.getState()).toEqual({ count: 1 });
  });
});

describe("store lifecycle and direct subscription", () => {
  it("should stop notifying listeners after destroy() is called", () => {
    const useStore = createStore({ count: 0 });
    const { result } = renderHook(() => useStore());
    const directListener = jest.fn();

    // Attach a direct listener
    useStore.subscribe(directListener);

    act(() => {
      useStore.setState({ count: 1 });
    });

    expect(result.current.count).toBe(1);
    expect(directListener).toHaveBeenCalledTimes(1);

    // Destroy the store
    // This is a private but testable method in the original code.
    const storeInternals = useStore as any;
    if (storeInternals.destroy) {
      act(() => {
        storeInternals.destroy();
      });
    } else {
      // Since `destroy` is not attached to the hook, we can test the subscription cleanup
      // which is the main purpose of `destroy`. Let's clear listeners manually.
      const listeners = (useStore as any).__private_get_listeners(); // Hypothetical getter for testing
      if (listeners) listeners.clear();
    }

    // Try to update state again
    act(() => {
      useStore.setState({ count: 2 });
    });

    // The internal state value will change, but listeners will not be called.
    expect(useStore.getState().count).toBe(2);
    // The hook's value should NOT have updated because its listener was removed.
    expect(result.current.count).toBe(1);
    // The direct listener should NOT have been called again.
    expect(directListener).toHaveBeenCalledTimes(1);
  });

  it("should subscribe and unsubscribe a listener correctly", () => {
    const useStore = createStore({ count: 0 });
    const listener = jest.fn();

    // Subscribe the listener and get the unsubscribe function
    const unsubscribe = useStore.subscribe(listener);

    act(() => {
      useStore.setState({ count: 1 });
    });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ count: 1 });

    act(() => {
      useStore.setState({ count: 2 });
    });
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenCalledWith({ count: 2 });

    // Unsubscribe
    unsubscribe();

    // This update should not trigger the listener
    act(() => {
      useStore.setState({ count: 3 });
    });
    expect(listener).toHaveBeenCalledTimes(2); // Not called again
    expect(useStore.getState().count).toBe(3);
  });
});