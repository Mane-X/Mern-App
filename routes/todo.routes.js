const express = require('express');
const router = express.Router();

// Import requireSignin middlewear
const { requireSignin } = require('../controllers/auth.controllers');

// Import Controllers
const {
	viewTodos,
	createTodo,
	deleteTodo,
	createTodoForUsers,
} = require("../controllers/todo.controllers");

router.get('/todos', requireSignin, viewTodos)
router.post('/todos/new', requireSignin, createTodo)
router.post("/todo/new/:email", requireSignin, createTodoForUsers);
router.delete('/todos/:_id/:email', requireSignin, deleteTodo)

module.exports = router