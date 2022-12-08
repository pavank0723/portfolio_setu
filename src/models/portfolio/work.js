import mongoose from "mongoose";

const Schema = mongoose.Schema

const portfolioSchema = new Schema(
    {
        title:{
            type:String,
            unique:true,
            required:true
        },
        category:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        demo:{
            type:String,
            required:false
        }
    }
)

export default mongoose.model('Portfolio',portfolioSchema,'portfolios')