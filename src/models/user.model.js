import { Schema, model } from 'mongoose';

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
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
