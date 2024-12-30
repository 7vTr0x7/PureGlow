import { Request, Response } from "express"
import Product, { IProduct } from "../models/product.model.js"
import { IUser } from "../models/user.model.js"

type UserResponse = IUser | null

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
