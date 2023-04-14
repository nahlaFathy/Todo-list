import express, { NextFunction, Request, Response } from 'express';
import UserController from '../controllers/user.controllers';

class UserRouter {
	private _router =  express();
    get router() {
		return this._router;
	}

    constructor() {
		this._routes();
	}

    private _routes() {
		this._router.post('/:userId/todo', (req: Request, res: Response, next: NextFunction) => {
			UserController.createTodo(req, res, next);
		});

        this._router.put('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			UserController.updateTodo(req, res, next);
		});

		this._router.delete('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			UserController.deleteTodo(req, res, next);
		});

		this._router.get('/:userId/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
			UserController.getTodoForUser(req, res, next);
		});
	}

}

export = new UserRouter().router;
