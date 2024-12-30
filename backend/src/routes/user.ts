import {Router} from "express"
import { getAllProducts, registerUser, updateSkinData, userLogin, userLogout,getUserData } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router:  Router = Router()


router.post("/login",userLogin)
router.post("/logout",userLogout)
router.post("/register",registerUser)

router.get("/products",isAuthenticated,getAllProducts)
router.get("/data",isAuthenticated,getUserData)
router.put("/update/skin-data/:id",isAuthenticated,updateSkinData)


export default router