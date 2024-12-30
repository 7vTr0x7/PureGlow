import express,{Router} from "express"
import { getAllProducts } from "../controllers/user"

const router:  Router = Router()

router.get("/products",getAllProducts)


export default router