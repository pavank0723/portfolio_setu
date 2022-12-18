import { boolean } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema

const aboutSchema = new Schema(
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
        doc:{
            type:String,
            required:false,
            get: (doc) => {
                //https://localhost:5100/uploads/portfolio/1669882893223-409215745.png
                //----Domain name-------/-----------Already have---------------------
                return `${APP_URL}/${doc}`
            }
        },
        social_link:[
            {
                type:'ObjectId',
                ref:'SocialMedia'
            }    
        ],
        info_category:[
            {
                type:'ObjectId',
                ref:'AboutInfo'
            }    
        ],
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    { timestamps: true, toJSON: { getters: true }, id:false }
)

export default mongoose.model('About',aboutSchema)