import { RefreshToken, User } from '../../models'
import { CustomErrorHandler} from '../../services/CustomErrorHandler'
// import registerSchema from "../../validations/registerValidator"
import bcrypt from 'bcrypt'
import { JwtService } from '../../services/JwtService'

import { REFRESH_SECRET } from '../../config'
import { registerSchema } from '../../validations/authValidator'



const registerController = {
    async register(req, res, next) {
        //[1️⃣] --== Validate ==-- the req
        //[2️⃣] --== Authorise ==-- the req
        //[3️⃣] --== Check ==-- if User is present in DB already or not
        //[4️⃣] --== Prepare ==-- a Model
        //[5️⃣] --== Store ==-- in Database
        //[6️⃣] --== Generate ==-- the JWT token
        //[7️⃣] --== Send ==-- res

        //#region 1️⃣ VALIDATE
        const regiterValidate = registerSchema.validate(req.body)
        
        //#endregion

        //#region 2️⃣ AUTHORIZE ==-> Joi Validate if error
        const { error } = regiterValidate

        if (error) {
            return next(error)
        }
        //#endregion

        //#region 3️⃣ CHECK ==-> if user already in DB or not
        try {
            const exist = await User.exists(
                {
                    email: req.body.email
                }
            )
            console.log("Email ",exist)
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This user already exist'))
            }
        } catch (error) {
            return next(error)
        }

        //#endregion

        const { name, email, password } = req.body

        //Hash Password
        const hashPassword = await bcrypt.hash(password, 10)

        //#region 4️⃣ PREPARE MODEL
        const user = new User(
            {
                name,
                email,
                password: hashPassword
            }
        )
        //#endregion

        //#region 5️⃣ STORE in DATABASE
        let access_token
        let refresh_token
        try {
            //Save 
            const result = await user.save()

            //#region 6️⃣Token
            //ACCESS TOKEN
            access_token = JwtService.sign(
                {
                    _id: result._id,
                    role: result.role
                }
            )
            //REFRESH TOKEN
            refresh_token = JwtService.sign(
                {
                    _id: result._id,
                    role: result.role
                },
                '1y',
                REFRESH_SECRET
            )
            //#endregion

            //DB whitelist
            await RefreshToken.create(
                {
                    token: refresh_token
                }
            )
            //#endregion
        } catch (error) {
            return next(error)
        }
        //#endregion

        //#region 7️⃣ Send
        res.json(
            {
                access_token,
                refresh_token
            }
        )
        
        //#endregion
    }
}

export default registerController