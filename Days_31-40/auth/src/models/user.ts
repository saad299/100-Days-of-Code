import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

const user = mongoose.model<UserInterface>("user", userSchema)

export default user;