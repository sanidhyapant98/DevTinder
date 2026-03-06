import mongoose from "mongoose";
import { User } from "./userModel.js";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    status : {
        type : String,
        enum : ["ignored", "accepted", "rejected", "interested"],
        message : `{VALUE} is not a valid status`
    }
}, {timestamps : true})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1}, {unique : true})  

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

export { ConnectionRequest }