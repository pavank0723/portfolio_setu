import mongoose from "mongoose";

const Schema = mongoose.Schema

const testimonialSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        comment:{
            type:String,
            required:false
        },
        image:{
            type:String,
            required:false
        },
        rating:{
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

export default mongoose.model('Testimonial',testimonialSchema,'testimonials')