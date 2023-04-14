
import { Types } from 'mongoose';
import Todo from '../models/todo';
import User from '../models/user';

interface ITODO {
    title: string;
    description: string;
    completed: boolean;
    user: Types.ObjectId;

}
class UserService {

    public async createTodo(userId: Types.ObjectId, todo: ITODO) {
        const { title, description, completed } = todo;
        try {
            const user: any = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Create a new Todo
            const todo = new Todo({
                title,
                description,
                completed,
                user: user._id // Associate the Todo with the User using the User's ObjectId
            });

            // Save the Todo to the database
            const savedTodo = await todo.save();
            return todo;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // Update an existing Todo for a specific User
    async updateTodo(userId: Types.ObjectId, todoId: Types.ObjectId, updatedFields: ITODO) {
        try {
            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Find the Todo by ID
            const todo = await Todo.findById(todoId);
            if (!todo) {
                throw new Error('Todo not found');
            }

            // Check if the Todo belongs to the User
            if (user._id.toString() !== todo.user.toString()) {
                throw new Error('Todo does not belong to User');
            }

            // Update the Todo fields
            const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedFields, { new: true });
            if (!updatedTodo) {
                throw new Error('Error updating Todo');
            }

            return updatedTodo;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Delete an existing Todo for a specific User
    async deleteTodo(userId: Types.ObjectId, todoId: Types.ObjectId) {
        try {
            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Find the Todo by ID and delete it
            const deletedTodo = await Todo.findByIdAndDelete(todoId);
            if (!deletedTodo) {
                throw new Error('Todo not found');
            }

            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Get specific todo information for a specific User
    async getTodoByUserIdAndTodoId(userId: Types.ObjectId, todoId: Types.ObjectId) {
        try {
            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Find the Todo by User ID and Todo ID
            const todo = await Todo.findOne({ _id: todoId, user: userId });
            if (!todo) {
                throw new Error('Todo not found');
            }

            return todo;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    async getAllTodosForUser(userId: Types.ObjectId) {
        try {

            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Find all Todos that belong to the specific User
            const todos = await Todo.find({ user: userId });
            return todos;
        } catch (err: any) {
            throw new Error(err)
        }
    }

}

export default new UserService();
