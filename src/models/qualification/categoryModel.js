import mongoose from "mongoose";

const Schema = mongoose.Schema

const qualificationCategSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        qualification:[
            {
                type:'ObjectId',
                ref:'Experience'
            }    
        ],
        description:{
            type:String,
            required:false
        },
        icon:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    {timestamps:true}
)

export default mongoose.model('QualificationCateg',qualificationCategSchema,'qualification_categs')