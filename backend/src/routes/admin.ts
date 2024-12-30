import { Router } from "express"
import { addProduct } from "../controllers/admin.js"

const router:  Router = Router()

router.get("/add/product",addProduct)


export default router