import { Request, Response } from "express"
import bcrypt from"bcrypt"
import Product, { IProduct } from "../models/product.model.js"
import User, { IUser } from "../models/user.model.js"
import { sendCookies } from "../utils/features.js"

type UserResponse = IUser | null

export const registerUser = async(req:Request,res:Response) => {
  try {
    const { email, password } = req.body;
    let user:UserResponse = await User.findOne({ email });
    if (user) {
      res.status(404).json({ success: false, message: "user already exists" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);

      user = await User.create({ email, password: hashedPass });
      sendCookies(user, res, "Register Successfully");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register User",
    });
  }
};

export const userLogout = async(req:Request, res:Response) => {
  try {
 
    res.cookie("token","").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
};


export const userLogin = async(req:Request,res:Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         res
          .status(400)
          .json({ success: false, message: "Invalid Email or Password" });
      } else {
        sendCookies(user, res, "Login Successfully");
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
};

export const getAllProducts = async(req:Request,res:Response) => {
try {
   const products:IProduct[] = await Product.find()
   if(products.length > 0) {
   res.json({
    success:true,
    products
   })
   }else{
    res.status(404).json({success:false,message:"Products not found"})
   }
} catch (error) {
     res.status(500).json({success:false,message:"Failed to get products"})
}
}


export const updateSkinData = async(req:Request,res:Response) => {
try {
   const user:UserResponse = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
   if(user) {
   res.json({
    success:true,
    user
   })
   }else{
    res.status(404).json({success:false,message:"user not found"})
   }
} catch (error) {
     res.status(500).json({success:false,message:"Failed to update user"})
}
}
