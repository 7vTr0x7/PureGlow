import mongoose, { Schema, Document } from "mongoose";

enum SkinType {
  Normal = "Normal",
  Oily = "Oily",
  Dry = "Dry",
  All = "All Skin Type",
}

interface SkinHealthMetrics {
  acneSuitability: number;
  hydrationSuitability: number;
  darkSpotsSuitability: number;
  skinType: Array<SkinType>;
}

interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  ratings: {
    average: number;
  };
  skinHealthMetrics: SkinHealthMetrics;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true
      min: 0,
    },
    ratings: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
    skinHealthMetrics: {
      acneSuitability: {
        type: Number,
        min: 0,
        max: 5,
      },
      hydrationSuitability: {
        type: Number,
        min: 0,
        max: 100,
      },
      darkSpotsSuitability: {
        type: Number,
        min: 0,
        max:5,
      },
      skinType: {
        type: [String],
        enum: Object.values(SkinType),
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
export { IProduct, SkinType };
