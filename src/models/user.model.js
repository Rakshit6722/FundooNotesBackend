import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password:{
      type: String,
      required: true,
      select: false
    },
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
