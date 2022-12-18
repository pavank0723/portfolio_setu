import mongoose from "mongoose";

const Schema = mongoose.Schema

const qualificationCategSchema = new Schema(
    {
        cat_id:Number,
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

qualificationCategSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('QualificationCateg', qualificationCategSchema,'qualification_categs').countDocuments(function(error, counter){
        if(error) return next(error);
        docs.cat_id = counter+1;
        next();
    });   
});

export default mongoose.model('QualificationCateg',qualificationCategSchema,'qualification_categs')