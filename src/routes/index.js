import express from "express"

import authRouter from './auth'
import portfolioRouter from "./portfolio/work"
import portfolioCategoryRouter from "./portfolio/portfolioCategory"
import certificateRouter from "./achievements/certificate"
import certificateCategoryRouter from "./achievements/certificateCategory"
import skillRouter from "./skill/techSkill"
import skillCategoryRouter from "./skill/skillCategory"

import aboutRouter from "./about/self_info"
import infoRouter from "./about/info_category"
import socialRouter from "./utils/social_media"

const router = express()

router.use('/auth/', authRouter)
router.use('/portfolio/', portfolioRouter)
router.use('/portfolio_category/', portfolioCategoryRouter)
router.use('/certificate/', certificateRouter)
router.use('/certificate_category/', certificateCategoryRouter)
router.use('/skill/', skillRouter)
router.use('/skill_category/', skillCategoryRouter)
router.use('/about/', aboutRouter)
router.use('/info_category/', infoRouter)
router.use('/utils/', socialRouter)


export default router