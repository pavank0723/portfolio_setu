import mongoose from "mongoose";

const Schema = mongoose.Schema

const categorySchema = new Schema(
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

// categorySchema.pre("save", function(next){
//     var docs = this;
//     mongoose.model('Category', categorySchema,'categories').countDocuments(function(error, counter){
//         if(error) return next(error);
//         docs.cat_id = counter+1;
//         next();
//     });   
// });


export default mongoose.model('Category',categorySchema,'categories')