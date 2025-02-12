import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const noteSchema = new Schema(
  {
    userId:{
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    isTrash: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
