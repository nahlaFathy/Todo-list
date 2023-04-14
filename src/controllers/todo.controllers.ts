
import { NextFunction, Request, Response } from 'express';
import todoService from '../services/todo.service';
import { Types } from 'mongoose';
class UserController {

    async createTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params; // Extract userId from the URL parameters
            const todo = req.body;
            const createdTodo = await todoService.createTodo(new Types.ObjectId(userId), todo);
            return res.status(200).json({ data: createdTodo })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error : error.message })
        }
    }

    async updateTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, todoId } = req.params;
            const updatedFields = req.body;
            const updatedTodo = await todoService.updateTodo(new Types.ObjectId(userId), new Types.ObjectId(todoId), updatedFields);
            return res.status(200).json({ data: updatedTodo });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async deleteTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, todoId } = req.params;
            const deletedTodo = await todoService.deleteTodo(new Types.ObjectId(userId), new Types.ObjectId(todoId));
            return res.status(200).json({ data: deletedTodo });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getTodoForUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, todoId } = req.params;
            const userTodo = await todoService.getTodoByUserIdAndTodoId(new Types.ObjectId(userId), new Types.ObjectId(todoId));
            return res.status(200).json({ data: userTodo })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }


}

export default new UserController();