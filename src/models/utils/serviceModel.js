import mongoose from "mongoose";

const Schema = mongoose.Schema

const serviceSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:false
        },
        icon:{
            type:String,
            required:true
        },
        info:[
            {
                type:'ObjectId',
                ref:'ServiceInfo'
            }    
        ],
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    {timestamps:true}
)

export default mongoose.model('Service',serviceSchema,'services')