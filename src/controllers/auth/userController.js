import { User } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"

const userController = {
    async user(req,res,next){
        try {
            //Check user by id
            const user = await User.findOne(
                {
                    _id:req.user._id
                }
            ).select('-password -__v -updatedAt')

            //If not present 
            if(!user){
                return next(CustomErrorHandler.notFound())
            }
            //Return the response detail
            res.json(user)

        } catch (error) {
            return next(error)
        }
    }

}
export default userController