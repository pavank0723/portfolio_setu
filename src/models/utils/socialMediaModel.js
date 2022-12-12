import mongoose from "mongoose";

const Schema = mongoose.Schema

const socialMediaSchema = new Schema(
    {
        link_id:Number,
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
        link:{
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

socialMediaSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('SocialMedia', socialMediaSchema).countDocuments(function(error, counter){
        if(error) return next(error);
        docs.link_id = counter+1;
        next();
    });   
});

export default mongoose.model('SocialMedia',socialMediaSchema)