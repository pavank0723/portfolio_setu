import mongoose from "mongoose";

const Schema = mongoose.Schema

const portfolioCategSchema = new Schema(
    {
        cat_id:Number,
        name:{
            type:String,
            required:true,
            unique:true
        },
        works:[
            {
                type:'ObjectId',
                ref:'Portfolio'
            }    
        ],
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

portfolioCategSchema.pre("save", function(next){
    var docs = this;    
    mongoose.model('PortfolioCateg', portfolioCategSchema,'portfolio_categs').countDocuments(function(error, counter){
        if(error) return next(error);
        docs.cat_id = counter+1;
        next();
    });   
});

export default mongoose.model('PortfolioCateg',portfolioCategSchema,'portfolio_categs')