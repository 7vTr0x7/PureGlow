import mongoose, { Schema, Document } from "mongoose";

interface SkinHealthMetrics {
  acneSuitability: number;
  hydrationSuitability: number;
  darkSpotsSuitability: number;
  skinType: Array<"Normal" | "Oily" | "Dry" | "All Skin Type">;
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
}

const productSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
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
      max: 5,
    },
    darkSpotsSuitability: {
      type: Number,
      min: 0,
      max: 5,
    },
    skinType: {
      type: [String],
      enum: ["Normal", "Oily", "Dry", "All Skin Type"],
    },
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
export { IProduct };
