import express from "express"
import { categoryController, certificateCategController, loginController, refreshController, registerController, userController } from "../controllers"
import { admin, auth } from "../middlewares"

const router = express.Router()

router.post('/auth/register', [auth, admin], registerController.register)

router.post('/auth/login', loginController.login)

router.get('/auth/user', auth, userController.user)

router.post('/auth/refresh', refreshController.refresh)

router.post('/auth/logout', loginController.logout)

router.post('/store/portfolio_category', [auth, admin], categoryController.store)

router.post('/edit/portfolio_category/:id', [auth, admin], categoryController.edit)
router.delete('/destroy/portfolio_category/:id', [auth, admin], categoryController.destroy)
router.get('/view/portfolio_categories', categoryController.index)
router.get('/view/portfolio_category/:id', categoryController.show)

router.post('/store/certificate_category',[auth,admin], certificateCategController.store)

router.post('/edit/certificate_category/:id',[auth,admin], certificateCategController.edit)
router.delete('/destroy/certificate_category/:id',[auth,admin], certificateCategController.destroy)
router.get('/view/certificate_categories', certificateCategController.index)
router.get('/view/certificate_category/:id', certificateCategController.show)

export default router