import { Router } from 'express';
import bodyParser from 'body-parser'
import UserRouter from './user.routes';
import AuthRoutes from './auth.routes';

class MasterRouter {
	private _router = Router();
	private _userRouter = UserRouter;
	private _authRouter = AuthRoutes
	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	/**
	 * Connect routes to their matching routers.
	 */
	private _configure() {
		this._router.use(bodyParser.json());
		this._router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
		this._router.use('/user', this._userRouter);
		this._router.use('/auth', this._authRouter);
	}
}

export default new MasterRouter().router;
