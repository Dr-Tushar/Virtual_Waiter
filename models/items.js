import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            required:true
        }
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    foodType:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        default:"4.5",
        required:true,
    },
    adminId:{ type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
},
{timestamps:true}
)

export const Items = mongoose.model("Item",itemSchema);

