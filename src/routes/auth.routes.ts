import express, { NextFunction, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

class AuthRouter {
	private _router =  express();
    get router() {
		return this._router;
	}

    constructor() {
		this._routes();
	}

    private _routes() {
		this._router.post('/login', (req: Request, res: Response, next: NextFunction) => {
			AuthController.login(req, res, next)
		});
	}

}

export default new AuthRouter().router;
