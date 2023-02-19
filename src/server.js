const express = require('express');
const cors = require('cors')


const { Todo } = require('./models');
const { loginRouter } = require('./routes/login');
const { logoutRouter } = require('./routes/logout');
const { signUpRouter } = require("./routes/signup");
const { userRouter } = require("./routes/user");

const { authenticateUser } = require('./middlewares/authentification');
const { checkToDoOwnership } = require('./middlewares/authorization');

const app = express();
app.use(express.json());
app.use(cors())


app.use(loginRouter);
app.use(logoutRouter);
app.use(signUpRouter);
app.use(userRouter);

// Create todo
app.post('/api/todo', authenticateUser , async (req, res) => {
  try {
    const { description } = req.body;

    const todo = await Todo.create({
      description: description || '',
      UserId: req.user.id,
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the todo');
  }
});

// Update an existing todo
app.patch('/api/todo/:id',authenticateUser, checkToDoOwnership, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    const updatedTodo = await todo.update({
      description: description || todo.description,
      completed: completed===undefined ? todo.completed:completed,
    });

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the todo');
  }
});

app.get('/api/todo', authenticateUser, async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { UserId: req.user.id } });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete todo
app.delete('/api/todo/:id', authenticateUser, checkToDoOwnership, async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Hello Todos!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
