import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    //email phone number password
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
