import mongoose from "mongoose";

const Schema = mongoose.Schema

const serviceInfoSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:false
        },
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    {timestamps:true}
)

export default mongoose.model('ServiceInfo',serviceInfoSchema)