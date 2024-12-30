import mongoose, { Schema, Document, Model } from "mongoose";

interface ISkinData {
  acne?: number;
  hydrationLevel?: number;
  darkSpots?: number;
}

interface IUser extends Document {
  email: string;
  password: string;
  skinData?: ISkinData;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema(
  {
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
     
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)

export default User;
export { IUser };