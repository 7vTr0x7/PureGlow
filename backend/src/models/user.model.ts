import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  skinData: {
    acne: {
      type: Number,
      min: 1,
      max: 5,
    },
    hydrationLevel: {
      type: Number,
      min: 1,
      max: 100,
    },
    darkSpots: {
      type: Number,
      min: 1,
      max: 100,
    },
    skinType: {
      type: String,
    },
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
export { IUser };