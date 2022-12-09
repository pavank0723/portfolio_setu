import express from "express"
import { categoryController, certificateCategController, certificateController, loginController, refreshController, registerController, userController, workController } from "../controllers"
import { admin, auth } from "../middlewares"

const router = express.Router()

router.post('/auth/register', [auth, admin], registerController.register)

router.post('/auth/login', loginController.login)

router.get('/auth/user', auth, userController.user)

router.post('/auth/refresh', refreshController.refresh)

router.post('/auth/logout', loginController.logout)


router.post('/store/portfolio_category', [auth, admin], categoryController.store)
router.get('/view/portfolio_categories', categoryController.index)
router.get('/view/portfolio_category/:id', categoryController.show)
router.put('/edit/portfolio_category/:id',[auth, admin], categoryController.edit)
router.delete('/destroy/portfolio_category/:id', [auth, admin], categoryController.destroy)

router.post('/store/portfolio',workController.store)
router.get('/view/portfolio',workController.view)
router.get('/view/portfolio/:id',workController.show)
router.put('/edit/portfolio/:id',[auth,admin],workController.edit)
router.delete('/destroy/portfolio/:id',[auth,admin],workController.destroy)

router.post('/store/certificate_category',[auth,admin], certificateCategController.store)
router.get('/view/certificate_categories', certificateCategController.index)
router.get('/view/certificate_category/:id', certificateCategController.show)
router.put('/edit/certificate_category/:id',[auth, admin], certificateCategController.edit)
router.delete('/destroy/certificate_category/:id',[auth,admin], certificateCategController.destroy)

router.post('/store/certificate',certificateController.store)
router.get('/view/certificate',certificateController.view)
router.get('/view/certificate/:id',certificateController.show)
router.put('/edit/certificate/:id',certificateController.edit)
router.delete('/destroy/certificate/:id',certificateController.destroy)

export default router