import mongoose from "mongoose";
import { APP_URL } from "../../config";

const Schema = mongoose.Schema

const certificateSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        demo:{
            type:String,
            required:false
        },
        image:{
            type:String,
            required:true,
            get: (image) => {
                //https://localhost:5100/uploads/certificate/1669882893223-409215745.png
                //----Domain name-------/-----------Already have---------------------
                return `${APP_URL}/${image}`
            }
        }
    },{ timestamps: true, toJSON: { getters: true }, id:false }
)

export default mongoose.model('Certificate',certificateSchema)