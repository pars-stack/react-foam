import React from 'react';
import { createStore } from '../src/index';

// User store
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
}

const useUserStore = createStore<UserState>({
  currentUser: null,
  isLoading: false
});

// Theme store
interface ThemeState {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
}

const useThemeStore = createStore<ThemeState>({
  theme: 'light',
  fontSize: 'medium'
});

// Shopping cart store
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const useCartStore = createStore<CartState>({
  items: [],
  total: 0
});

// Helper function to calculate cart total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// User Profile Component
const UserProfile: React.FC = () => {
  const { currentUser, isLoading } = useUserStore();

  const loginUser = () => {
    useUserStore.setState(state => ({ ...state, isLoading: true }));
    
    // Simulate API call
    setTimeout(() => {
      useUserStore.setState({
        currentUser: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        },
        isLoading: false
      });
    }, 1000);
  };

  const logoutUser = () => {
    useUserStore.setState({
      currentUser: null,
      isLoading: false
    });
  };

  if (isLoading) {
    return <div style={{ padding: '10px' }}>Loading user...</div>;
  }

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>User Profile</h3>
      {currentUser ? (
        <div>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <button onClick={loginUser}>Login</button>
        </div>
      )}
    </div>
  );
};

// Theme Selector Component
const ThemeSelector: React.FC = () => {
  const { theme, fontSize } = useThemeStore();

  const toggleTheme = () => {
    useThemeStore.setState(state => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const changeFontSize = (size: 'small' | 'medium' | 'large') => {
    useThemeStore.setState(state => ({
      ...state,
      fontSize: size
    }));
  };

  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '18px' : '14px'
    }}>
      <h3>Theme Settings</h3>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>Font size: <strong>{fontSize}</strong></p>
      <button onClick={toggleTheme} style={{ margin: '5px' }}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div>
        <button onClick={() => changeFontSize('small')} style={{ margin: '2px' }}>Small</button>
        <button onClick={() => changeFontSize('medium')} style={{ margin: '2px' }}>Medium</button>
        <button onClick={() => changeFontSize('large')} style={{ margin: '2px' }}>Large</button>
      </div>
    </div>
  );
};

// Shopping Cart Component
const ShoppingCart: React.FC = () => {
  const { items, total } = useCartStore();

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    useCartStore.setState(state => {
      const existingItem = state.items.find(i => i.id === item.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }
      
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const removeItem = (id: string) => {
    useCartStore.setState(state => {
      const newItems = state.items.filter(item => item.id !== id);
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const clearCart = () => {
    useCartStore.setState({
      items: [],
      total: 0
    });
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Shopping Cart</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => addItem({ id: '1', name: 'Widget A', price: 10.99 })}>
          Add Widget A ($10.99)
        </button>
        <button onClick={() => addItem({ id: '2', name: 'Gadget B', price: 25.50 })} style={{ marginLeft: '5px' }}>
          Add Gadget B ($25.50)
        </button>
      </div>
      
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '5px 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>{item.name} (x{item.quantity})</span>
              <span>
                ${(item.price * item.quantity).toFixed(2)}
                <button 
                  onClick={() => removeItem(item.id)} 
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Remove
                </button>
              </span>
            </div>
          ))}
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Total: ${total.toFixed(2)}
          </div>
          <button onClick={clearCart} style={{ marginTop: '10px' }}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

// Component that demonstrates cross-store interactions
const StoreInteractions: React.FC = () => {
  // Only subscribe to specific parts of each store
  const userName = useUserStore(state => state.currentUser?.name);
  const theme = useThemeStore(state => state.theme);
  const cartItemCount = useCartStore(state => state.items.length);

  const performComplexAction = () => {
    // Example of coordinating multiple stores
    const userState = useUserStore.getState();
    const cartState = useCartStore.getState();
    
    if (!userState.currentUser) {
      alert('Please login first!');
      return;
    }
    
    if (cartState.items.length === 0) {
      alert('Please add items to cart first!');
      return;
    }
    
    alert(`${userState.currentUser.name} is checking out ${cartState.items.length} items for $${cartState.total.toFixed(2)}`);
  };

  return (
    <div style={{ 
      padding: '10px', 
      border: '2px solid #007acc', 
      margin: '10px',
      backgroundColor: theme === 'dark' ? '#444' : '#f0f8ff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h3>Cross-Store Status</h3>
      <p>User: {userName || 'Not logged in'}</p>
      <p>Theme: {theme}</p>
      <p>Cart items: {cartItemCount}</p>
      <button onClick={performComplexAction} style={{ marginTop: '10px' }}>
        Checkout (Cross-store action)
      </button>
    </div>
  );
};

// Main app component
const MultiStoreApp: React.FC = () => {
  const theme = useThemeStore(state => state.theme);
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#222' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      padding: '20px'
    }}>
      <h1>React Foam Multiple Stores Example</h1>
      <p>This example demonstrates multiple independent stores working together.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
        <UserProfile />
        <ThemeSelector />
        <ShoppingCart />
      </div>
      
      <StoreInteractions />
    </div>
  );
};

export default MultiStoreApp;

