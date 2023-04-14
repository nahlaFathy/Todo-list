import User from '../models/user';
import jwt from 'jsonwebtoken';

class AuthService {

    async login(email: string, secret: string) {
        try {
            // Find the user in the mock user data
            const user: any = await User.findOne({ email, secret });
            // If user not found, return error
            if (!user) {
                throw new Error('Invalid username or password');
            }
            // Generate and sign JWT token with user ID and secret key
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || 'secret-key', { expiresIn: '1h' });

            // Return the token as response
            return token;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new AuthService();