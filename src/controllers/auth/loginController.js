import { RefreshToken, User } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"

import bcrypt from 'bcrypt'
import { JwtService } from "../../services/JwtService"
import { REFRESH_SECRET } from "../../config"
import Joi from "joi"
import { PASSWORD_RE } from "../../utils/const"
import { loginSchema } from "../../validations/authValidator"

const loginController = {
    async login(req, res, next) {
        //1️⃣ VALIDATION
        const loginValidator = loginSchema.validate(req.body)

        //2️⃣ AUTHORIZE -==> Joi Validate if error
        const { error } = loginValidator
        if (error) {
            return next(error)
        }

        //3️⃣ CHECK -==> if user in DB or not
        try {
            //EMAIL in DB or not
            const user = await User.findOne(
                {
                    email: req.body.email
                }
            )
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            //MATCH PASSWORD
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            //TOKEN 
            const access_token = JwtService.sign(
                {
                    _id: user._id,
                    role: user.role
                }
            )
            const refresh_token = JwtService.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                '1y',
                REFRESH_SECRET
            )
            //DB Whitelist
            await RefreshToken.create(
                {
                    token: refresh_token
                }
            )
            res.json(
                {
                    access_token,
                    refresh_token
                }
            )
        } catch (error) {
            return next(error)
        }
    },

    async logout(req, res, next) {
        //1️⃣ VALIDATION
        const refTokenValidator = refreshSchema.validate(req.body)

        //2️⃣ AUTHORIZE -==> Joi validate if error
        const { error } = refTokenValidator
        if (error) {
            return next(error)
        }

        //3️⃣ DELETE TOKEN
        try {
            await RefreshToken.deleteOne(
                {
                    token: req.body.refresh_token
                }
            )
        } catch (error) {
            return next(new Error('Something went wrong in DB'))
        }
    }
}

export default loginController