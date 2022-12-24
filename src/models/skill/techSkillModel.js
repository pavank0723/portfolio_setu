import mongoose from "mongoose";
import { APP_URL } from "../../config";

const Schema = mongoose.Schema

const techSkillSchema = new Schema(
    {
        title:{
            type:String,
            unique:true,
            required:false
        },
        subtitle:{
            type:String,
            required:false
        },
        image:{
            type:String,
            required:false,
            get: (image) => {
                //https://localhost:5100/uploads/portfolio/1669882893223-409215745.png
                //----Domain name-------/-----------Already have---------------------
                return `${APP_URL}/${image}`
            }
        }
    },{ timestamps: true, toJSON: { getters: true }, id:false }
)

export default mongoose.model('TechSkill',techSkillSchema,'tech_skills')