import { Request, Response } from "express"
import Product, { IProduct } from "../models/product.model.js"

export const addProduct = async(req:Request,res:Response) => {
try {
   const product = await Product.create()
   if(product) {
   res.json({
    success:true,
    product
   })
   }else{
    res.status(404).json({success:false,message:"Product not found"})
   }
} catch (error) {
     res.status(500).json({success:false,message:"Failed to get product"})
}
}