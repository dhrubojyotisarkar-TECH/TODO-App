const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

// API endpoints
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index !== -1) {
    todos[index].text = text;
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id != id);
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
