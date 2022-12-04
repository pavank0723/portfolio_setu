import mongoose from "mongoose";

const Schema = mongoose.Schema

const catCountSchema = new Schema(
    {
        id:{
            type:String
        },
        seq:{
            type:Number
        }
    }
)

export default mongoose.model('CatCount',catCountSchema,'catCounts')