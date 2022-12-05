import express from "express"
import { categoryController, loginController, refreshController, registerController, userController } from "../controllers"
import { admin, auth } from "../middlewares"

const router = express.Router()

router.post('/auth/register', [auth, admin], registerController.register)

router.post('/auth/login', loginController.login)

router.get('/auth/user', auth, userController.user)

router.post('/auth/refresh', refreshController.refresh)

router.post('/auth/logout', loginController.logout)

router.post('/store/category', [auth, admin], categoryController.store)

router.post('/edit/category/:id', [auth, admin], categoryController.edit)
router.delete('/destroy/category/:id', [auth, admin], categoryController.destroy)
router.get('/view/categories', categoryController.index)
router.get('/view/category/:id', categoryController.show)

export default router