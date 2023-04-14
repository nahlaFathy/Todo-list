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
		this._router.post('/todo', authenticateUser, (req: Request, res: Response, next: NextFunction) => {
			TodoController.createTodo(req, res, next);
		});

		this._router.put('/todo/:todoId', authenticateUser, (req: Request, res: Response, next: NextFunction) => {
			TodoController.updateTodo(req, res, next);
		});

		this._router.delete('/todo/:todoId', authenticateUser, (req: Request, res: Response, next: NextFunction) => {
			TodoController.deleteTodo(req, res, next);
		});

		this._router.get('/todo/:todoId', authenticateUser, (req: Request, res: Response, next: NextFunction) => {
			TodoController.getTodoForUser(req, res, next);
		});

		this._router.get('/:userId/todos', (req: Request, res: Response, next: NextFunction) => {
			UserController.getAllTodosForUser(req, res, next);
		});

	}

}

export default new UserRouter().router;
