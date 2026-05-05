import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/v4/core/util.cjs";

const ChatSchema = new mongoose.Schema({
    //db table detail
    sender:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiver:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
        min:1,
        max:2000,

    },
    file:{
        id: String,
        url: String,
        optimized: String,
    },
    reaction : {
        type: String,
    },

},

{
    //options
    timestamps:true,        //created at ani updated at
    autoCreate:true,
    autoIndex:true
}
)



const ChatModel = mongoose.model("Chat",ChatSchema)

export default ChatModel;