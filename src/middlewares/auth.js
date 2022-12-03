import CustomErrorHandler from "../services/CustomErrorHandler"
import { JwtService } from "../services/JwtService"

const auth = async (req, res, next) => {
    //Get Authorization Header
    let authHeader = req.headers.authorization
    console.log('Auth Headers---> ', authHeader)

    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized())
    }
    const token = authHeader.split(' ')[1]
    console.log('Token GET -->>> ',token)

    try {
        const {_id,role} = await JwtService.verify(token)
        const user = {
            _id,
            role
        }
        req.user = user

        next()
    } catch (error) {
        return next(CustomErrorHandler.unAuthorized())
    }
}

export default auth