import { Schema, model } from 'mongoose';
import Todo from './todo';

// user schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
});

const User = model('User', userSchema);

export default  User;

