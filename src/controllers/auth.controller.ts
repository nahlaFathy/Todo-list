import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';

class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const { email, secret } = req.body;
            const token = await authService.login(email, secret);
            return res.status(200).json({ token });
        } catch(error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }


}

export default new AuthController();