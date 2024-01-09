import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{
    timestamp:true
})

export default mongoose.model("Message",messageSchema)