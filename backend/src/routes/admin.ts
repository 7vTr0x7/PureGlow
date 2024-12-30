import { Router } from "express"
import { addProduct, deleteProduct, updateProduct } from "../controllers/admin.js"

const router:  Router = Router()

router.post("/add/product",addProduct)
router.put("/update/product/:id",updateProduct)
router.delete("/delete/product/:id",deleteProduct)


export default router