import mongoose from "mongoose";
import { APP_URL } from "../../config";

const Schema = mongoose.Schema

const experienceSchema = new Schema(
    {
        title:{
            type:String,
            unique:true,
            required:true
        },
        subtitle:{
            type:String,
            required:false
        },
        start_year:{
            type:String,
            required:false
        },
        end_year:{
            type:String,
            required:false
        },
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },{ timestamps: true}
)

export default mongoose.model('Experience',experienceSchema)