import mongoose from "mongoose";

const Schema = mongoose.Schema

const aboutInfoSchema = new Schema(
    {
        info_id:Number,
        title:{
            type:String,
            required:true,
            unique:true
        },
        subtitle:{
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

aboutInfoSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('AboutInfo', aboutInfoSchema).countDocuments(function(error, counter){
        if(error) return next(error);
        docs.link_id = counter+1;
        next();
    });   
});

export default mongoose.model('AboutInfo',aboutInfoSchema,'about_infos')