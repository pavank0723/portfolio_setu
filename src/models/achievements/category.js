import mongoose from "mongoose";

const Schema = mongoose.Schema

const certificateCategSchema = new Schema(
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
        isActive:{
            type:Boolean,
            default:true,
            required:false
        }
    },
    {timestamps:true}
)

certificateCategSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('CertificateCateg', certificateCategSchema,'certificate_categs').countDocuments(function(error, counter){
        if(error) return next(error);
        docs.cat_id = counter+1;
        next();
    });   
});

export default mongoose.model('CertificateCateg',certificateCategSchema,'certificate_categs')