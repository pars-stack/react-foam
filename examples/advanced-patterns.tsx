import React, { useEffect } from 'react';
import { createStore, computed } from '../src/index';

// Todo List Example with Advanced Patterns
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
  isLoading: boolean;
  lastUpdated: Date | null;
}

const useTodoStore = createStore<TodoState>({
  todos: [],
  filter: 'all',
  searchTerm: '',
  isLoading: false,
  lastUpdated: null
});

// Computed values using the utility function
const getFilteredTodos = computed(useTodoStore, (state) => {
  let filtered = state.todos;
  
  // Apply search filter
  if (state.searchTerm) {
    filtered = filtered.filter(todo => 
      todo.text.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter
  switch (state.filter) {
    case 'active':
      return filtered.filter(todo => !todo.completed);
    case 'completed':
      return filtered.filter(todo => todo.completed);
    default:
      return filtered;
  }
});

const getTodoStats = computed(useTodoStore, (state) => ({
  total: state.todos.length,
  completed: state.todos.filter(t => t.completed).length,
  active: state.todos.filter(t => !t.completed).length,
  highPriority: state.todos.filter(t => t.priority === 'high' && !t.completed).length
}));

// Todo Actions (demonstrating action patterns)
const todoActions = {
  addTodo: (text: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      priority
    };
    
    useTodoStore.setState(state => ({
      ...state,
      todos: [...state.todos, newTodo],
      lastUpdated: new Date()
    }));
  },

  toggleTodo: (id: string) => {
    useTodoStore.setState(state => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
      lastUpdated: new Date()
    }));
  },

  deleteTodo: (id: string) => {
    useTodoStore.setState(state => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
      lastUpdated: new Date()
    }));
  },

  updateTodo: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority'>>) => {
    useTodoStore.setState(state => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
      lastUpdated: new Date()
    }));
  },

  setFilter: (filter: TodoState['filter']) => {
    useTodoStore.setState(state => ({ ...state, filter }));
  },

  setSearchTerm: (searchTerm: string) => {
    useTodoStore.setState(state => ({ ...state, searchTerm }));
  },

  clearCompleted: () => {
    useTodoStore.setState(state => ({
      ...state,
      todos: state.todos.filter(todo => !todo.completed),
      lastUpdated: new Date()
    }));
  },

  loadTodos: async () => {
    useTodoStore.setState(state => ({ ...state, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleTodos: Todo[] = [
      {
        id: '1',
        text: 'Learn React Foam',
        completed: false,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        priority: 'high'
      },
      {
        id: '2',
        text: 'Build awesome app',
        completed: true,
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        priority: 'medium'
      },
      {
        id: '3',
        text: 'Write documentation',
        completed: false,
        createdAt: new Date(),
        priority: 'low'
      }
    ];
    
    useTodoStore.setState(state => ({
      ...state,
      todos: sampleTodos,
      isLoading: false,
      lastUpdated: new Date()
    }));
  }
};

// Todo Input Component
const TodoInput: React.FC = () => {
  const [text, setText] = React.useState('');
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      todoActions.addTodo(text.trim(), priority);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '8px', fontSize: '14px' }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          style={{ padding: '8px' }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Add Todo
        </button>
      </div>
    </form>
  );
};

// Todo Filters Component
const TodoFilters: React.FC = () => {
  const { filter, searchTerm } = useTodoStore();

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => todoActions.setSearchTerm(e.target.value)}
          placeholder="Search todos..."
          style={{ padding: '8px', width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {(['all', 'active', 'completed'] as const).map(filterType => (
          <button
            key={filterType}
            onClick={() => todoActions.setFilter(filterType)}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === filterType ? '#007acc' : '#f0f0f0',
              color: filter === filterType ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

// Todo Stats Component (demonstrates computed values)
const TodoStats: React.FC = () => {
  const stats = getTodoStats();
  const lastUpdated = useTodoStore(state => state.lastUpdated);

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Statistics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        <div>Total: <strong>{stats.total}</strong></div>
        <div>Active: <strong>{stats.active}</strong></div>
        <div>Completed: <strong>{stats.completed}</strong></div>
        <div>High Priority: <strong style={{ color: '#dc3545' }}>{stats.highPriority}</strong></div>
      </div>
      {lastUpdated && (
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

// Todo Item Component
const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      todoActions.updateTodo(todo.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '8px',
      backgroundColor: todo.completed ? '#f8f9fa' : 'white'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => todoActions.toggleTodo(todo.id)}
        style={{ marginRight: '10px' }}
      />
      
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: priorityColors[todo.priority],
          marginRight: '10px'
        }}
        title={`${todo.priority} priority`}
      />

      {isEditing ? (
        <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            style={{ flex: 1, padding: '4px' }}
            autoFocus
          />
          <button onClick={handleSave} style={{ padding: '4px 8px' }}>Save</button>
          <button onClick={handleCancel} style={{ padding: '4px 8px' }}>Cancel</button>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#666' : 'black'
          }}>
            {todo.text}
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              Edit
            </button>
            <button
              onClick={() => todoActions.deleteTodo(todo.id)}
              style={{ padding: '4px 8px', fontSize: '12px', color: '#dc3545' }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Todo List Component
const TodoList: React.FC = () => {
  const { isLoading } = useTodoStore();
  const filteredTodos = getFilteredTodos();

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading todos...</div>;
  }

  if (filteredTodos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No todos found. Add some todos to get started!
      </div>
    );
  }

  return (
    <div>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

// Main Todo App Component
const TodoApp: React.FC = () => {
  const stats = getTodoStats();

  // Load initial data
  useEffect(() => {
    todoActions.loadTodos();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>React Foam Advanced Todo App</h1>
      <p>Demonstrates advanced patterns: computed values, actions, async operations, and optimized re-renders.</p>
      
      <TodoStats />
      <TodoInput />
      <TodoFilters />
      <TodoList />
      
      {stats.completed > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={todoActions.clearCompleted}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear {stats.completed} Completed Todo{stats.completed !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;

