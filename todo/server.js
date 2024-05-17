const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

const Todo = sequelize.define('Todo', {
  item: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'todos'
});

sequelize.sync();

app.post('/api/todos', async (req, res) => {
  const todo = await Todo.create({
    item: req.body.item
  });
  res.status(201).send(todo);
});

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.status(200).send(todos);
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
