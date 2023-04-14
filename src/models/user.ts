import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
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

// hashing user secret before creating new user 
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('secret')) {
    return next();
  }
  if (user.secret) {
    try {
      const salt = await bcrypt.genSalt(10);
      bcrypt.hash(user.secret, salt, (err, hashedPassword) => {
        if (err) {
          return;
        }
        user.secret = hashedPassword;
        next();
      });
    } catch (err: any) {
      return next(err);
    }
  }
});

const User = model('User', userSchema);


export default User;

