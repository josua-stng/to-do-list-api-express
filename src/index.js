import express from 'express';
import todo from './to-do.js';
const app = express();
const PORT = 3000;
const local = 'localhost';

// For JSON
app.use(express.json());

// Create todo
app.post('/todo', (req, res) => {
  const { days, morning, afternoon, evening, night } = req.body;
  if ((days, morning, afternoon, evening, night === undefined)) {
    return res.status(400).send({
      status: 400,
      message: 'Failed added todo.please fill in the activity',
    });
  }
  const newTodo = {
    days,
    morning,
    afternoon,
    evening,
    night,
  };
  todo.push(newTodo);

  const isSucces = todo;

  if (isSucces) {
    res.json({
      status: 200,
      error: null,
      data: {
        todos: days,
      },
    });
  } else {
    res.json({
      status: 404,
      message: 'failed to add todos',
    });
  }
});

// Get all todo
app.get('/todo', (req, res) => {
  const take_todos = () => {
    res.json({
      status: 200,
      message: 'todo successfully displayed',
      data: {
        todo,
      },
    });
  };
  take_todos();
});

// Get todo's by days
app.get('/todo/:days', (req, res) => {
  const { days } = req.params;
  const todos = todo.filter((t) => t.days === days)[0];
  if (todos !== undefined) {
    res.json({
      status: 200,
      message: 'Todo Successfully Displayed',
      data: {
        todos,
      },
    });
  } else {
    res.json({
      status: 404,
      message: 'Days Not Found',
    });
  }
});

// Edit todo with put
app.put('/todo/:days', (req, res) => {
  const { days } = req.params;
  const { morning, afternoon, evening, night } = req.body;
  const updatedTodo = todo.findIndex((t) => t.days === days);

  if (updatedTodo === -1) {
    return res.status(404).send({
      status: 404,
      message: 'Failed updated todo,days not found',
    });
  }

  todo[updatedTodo] = {
    ...todo[updatedTodo],
    morning,
    afternoon,
    evening,
    night,
  };
  if (updatedTodo !== -1) {
    return res.status(200).send({
      status: 200,
      message: 'Todos success updated',
    });
  }
});

// Delete todos with days
app.delete('/todo/:days', (req, res) => {
  const { days } = req.params;
  const index = todo.findIndex((todos) => todos.days === days);
  if (index !== -1) {
    todo.splice(index, 1);
    return res.status(200).send({
      status: 200,
      message: 'Todo success deleted',
    });
  } else {
    return res.status(400).send({
      status: 400,
      message: 'Failed deleted. Days not found',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Your server running at http://${local}:${PORT}`);
});
