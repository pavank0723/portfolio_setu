import express from "express"
import { portfolioCategController, certificateCategController, certificateController, loginController, refreshController, registerController, userController, workController, skillCategController } from "../controllers"
import { admin, auth } from "../middlewares"

const router = express.Router()

router.post('/auth/register', [auth, admin], registerController.register)

router.post('/auth/login', loginController.login)

router.get('/auth/user', auth, userController.user)

router.post('/auth/refresh', refreshController.refresh)

router.post('/auth/logout', loginController.logout)


router.post('/store/portfolio_category', [auth, admin], portfolioCategController.store)
router.get('/view/portfolio_categories', portfolioCategController.index)
router.get('/view/portfolio_category/:id', portfolioCategController.show)
router.put('/edit/portfolio_category/:id',[auth, admin], portfolioCategController.edit)
router.delete('/destroy/portfolio_category/:id', [auth, admin], portfolioCategController.destroy)

router.post('/store/portfolio',workController.store)
router.get('/view/portfolios',workController.view)
router.get('/view/portfolio/:id',workController.show)
router.put('/edit/portfolio/:id',[auth,admin],workController.edit)
router.delete('/destroy/portfolio/:id',[auth,admin],workController.destroy)

router.post('/store/certificate_category',[auth,admin], certificateCategController.store)
router.get('/view/certificate_categories', certificateCategController.index)
router.get('/view/certificate_category/:id', certificateCategController.show)
router.put('/edit/certificate_category/:id',[auth, admin], certificateCategController.edit)
router.delete('/destroy/certificate_category/:id',[auth,admin], certificateCategController.destroy)

router.post('/store/certificate',[auth, admin],certificateController.store)
router.get('/view/certificates',certificateController.view)
router.get('/view/certificate/:id',certificateController.show)
router.put('/edit/certificate/:id',[auth, admin],certificateController.edit)
router.delete('/destroy/certificate/:id',[auth, admin],certificateController.destroy)

router.post('/store/skill_category',[auth, admin],skillCategController.store)
router.get('/view/skill_categories',skillCategController.show)
router.get('/view/skill_category/:id',skillCategController.index)
router.put('/edit/skill_category/:id',[auth, admin],skillCategController.edit)
router.delete('/destroy/skill_category/:id',[auth, admin],skillCategController.destroy)

export default router