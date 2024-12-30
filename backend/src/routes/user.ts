import express,{Router} from "express"
import { getAllProducts, registerUser, updateSkinData, userLogin, userLogout,getUserData } from "../controllers/user.js"

const router:  Router = Router()


router.post("/login",userLogin)
router.post("/logout",userLogout)
router.post("/register",registerUser)

router.get("/products",getAllProducts)
router.get("/data",getUserData)
router.put("/update/skin-data/:id",updateSkinData)


export default router