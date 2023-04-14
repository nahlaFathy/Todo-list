import express, { NextFunction, Request, Response } from 'express';
import TodoController from '../controllers/todo.controllers';
import { authenticateUser } from '../middlewares/authentication';
class UserRouter {
	private _router = express();
	get router() {
		return this._router;
	}

	constructor() {
		this._routes();
	}

	private _routes() {
		this._router.post('/todo', authenticateUser, TodoController.createTodo);

		this._router.put('/todo/:todoId', authenticateUser, TodoController.updateTodo);

		this._router.delete('/todo/:todoId', authenticateUser, TodoController.deleteTodo);

		this._router.get('/todo/:todoId', authenticateUser, TodoController.getTodoForUser);

		this._router.get('/todos', authenticateUser, TodoController.getAllTodosForUser);
	}

}

export default new UserRouter().router;
