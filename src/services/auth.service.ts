import User from '../models/user';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

class AuthService {

    async login(email: string, secret: string) {
        try {
            // Find the user
            const user: any = await User.findOne({ email });
            // If user not found, return error
            if (!user) {
                throw new Error('Wrong credentials');
            }
            if(secret) {
                if(!bcrypt.compareSync(secret, user.secret)) 
                throw new Error('Wrong Credentials');
            } else {
                throw new Error('Wrong Credentials');
            }
            // Generate and sign JWT token with user ID and secret key
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || 'secret-key', { expiresIn: '1h' });

            // Return the token as response
            return token;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async signup(username: string, email: string, secret: string) {
        try {
            // Find the user in the mock user data
            const user: any = await User.findOne({ email });
            // If user not found, return error
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = new User({
                username,
                email,
                secret
            })
            // Save the Todo to the database
            const createdUser = await newUser.save();
            return createdUser;

        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new AuthService();