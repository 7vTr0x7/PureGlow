import express,{Router} from "express"
import { getAllProducts, updateSkinData } from "../controllers/user"

const router:  Router = Router()

router.get("/products",getAllProducts)
router.get("/update/skin-data",updateSkinData)


export default router