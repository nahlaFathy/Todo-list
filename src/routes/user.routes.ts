import express, { NextFunction, Request, Response } from 'express';
import TodoController from '../controllers/user.controllers';

class TodoRouter {
	private _router =  express();
    get router() {
		return this._router;
	}

    constructor() {
		this._routes();
	}

    private _routes() {
		this._router.post('/:userId/todo', (req: Request, res: Response, next: NextFunction) => {
			TodoController.createTodo(req, res, next);
		});

        this._router.put('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			TodoController.updateTodo(req, res, next);
		});

		this._router.delete('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			TodoController.deleteTodo(req, res, next);
		});

		this._router.get('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			TodoController.getTodoForUser(req, res, next);
		});

		this._router.get('/:userId/todos', (req: Request, res: Response, next: NextFunction) => {
			TodoController.getAllTodosForUser(req, res, next);
		});

	}

}

export = new TodoRouter().router;
