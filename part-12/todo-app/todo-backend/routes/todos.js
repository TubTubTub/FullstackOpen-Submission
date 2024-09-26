const express = require('express');
const redis = require('../redis');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  
  let todoCount = await redis.getAsync('added_todos');
  if (!todoCount) {
    todoCount = 0;
  }
  await redis.setAsync('added_todos', Number(todoCount) + 1)
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  if (!todoCount) {
    todoCount = Todo.countDocuments({})
  }
  await redis.setAsync('added_todos', Number(todoCount) + 1)

  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo;
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const newTodo = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, newTodo, { new: true });
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
