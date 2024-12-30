import express,{Router} from "express"
import { getAllProducts, registerUser, updateSkinData, userLogin } from "../controllers/user.js"

const router:  Router = Router()


router.post("/login",userLogin)
router.post("/register",registerUser)

router.get("/products",getAllProducts)
router.get("/update/skin-data",updateSkinData)


export default router