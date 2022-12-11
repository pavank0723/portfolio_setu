import mongoose from "mongoose";

const Schema = mongoose.Schema

const skillCategSchema = new Schema(
    {
        cat_id:Number,
        name:{
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
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    {timestamps:true}
)

skillCategSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('SkillCateg', skillCategSchema,'skill_categs').countDocuments(function(error, counter){
        if(error) return next(error);
        docs.cat_id = counter+1;
        next();
    });   
});

export default mongoose.model('SkillCateg',skillCategSchema,'skill_categs')