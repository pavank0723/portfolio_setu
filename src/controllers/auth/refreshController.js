import Joi from "joi"
import { REFRESH_SECRET } from "../../config"
import { RefreshToken, User } from "../../models"

import CustomErrorHandler from "../../services/CustomErrorHandler"
import { JwtService } from "../../services/JwtService"
import { refreshSchema } from "../../validations/authValidator"

const refreshController = {
    async refresh(req, res, next) {
        //1️⃣ VALIDATION
        const refreshValidator = refreshSchema.validate(req.body)
        
        //2️⃣ AUTHORIZE -==> Joi Validate if error
        const { error } = refreshValidator
        if (error) {
            return next(error)
        }

        //3️⃣ DATABASE
        //Check refresh token or not
        let refreshToken
        try {
            refreshToken = await RefreshToken.findOne(
                {
                    token: req.body.refresh_token
                }
            )
            if (!refreshToken) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'))
            }

            //Check User ID with refresh token
            let userId
            try {
                const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET)
                userId = _id
            } catch (error) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'))
            }
            const user = User.findOne(
                {
                    _id: userId
                }
            )
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found'))
            }

            //#region 4️⃣ Token
            //4️⃣.1️⃣ACCESS TOKEN
            const access_token = JwtService.sign(
                {
                    _id: user._id,
                    role: user.role
                }
            )
            //4️⃣.2️⃣REFRESH TOKEN
            const refresh_token = JwtService.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                '1y',
                REFRESH_SECRET
            )

            //4️⃣.3️⃣DB whitelist
            await RefreshToken.create(
                {
                    token: refresh_token
                }
            )
            //Return response
            res.json(
                {
                    access_token,
                    refresh_token
                }
            )
            //#endregion

        } catch (error) {
            return next(new Error('Something went wrong ', error.message))
        }
    }
}

export default refreshController