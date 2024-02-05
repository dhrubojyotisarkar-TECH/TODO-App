import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const addTodo = () => {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]))
      .catch((error) => console.error('Error:', error));

    setNewTodo('');
  };

  const updateTodo = (id, newText) => {
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === data.id ? { ...todo, text: data.text } : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error('Error:', error));
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.text}
                onChange={(e) => updateTodo(todo.id, e.target.value)}
              />
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
