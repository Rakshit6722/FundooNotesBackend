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
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassowrd = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
}

export default model('User', userSchema);
