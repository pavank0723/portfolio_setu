import express from "express"
import { loginController, refreshController, registerController, userController } from "../controllers"
import { admin, auth } from "../middlewares"

const router = express.Router()

router.post('/auth/register',[auth,admin],registerController.register)

router.post('/auth/login',loginController.login)

router.get('/auth/user',auth,userController.user)

router.post('/auth/refresh',refreshController.refresh)

router.post('/auth/logout',loginController.logout)

export default router