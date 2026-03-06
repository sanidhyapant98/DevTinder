import ConnectionRequest from "../models/connectionRequest.js";
import { User } from "../models/userModel.js";

const sendConnectionRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id
        const {status, toUserId} = req.params
        const userExists = await User.findById(toUserId)
        if(!userExists){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        if(fromUserId.equals(toUserId)){
            return res.status(400).json({
                success : false,
                message : "You cannot send connection request to yourself"
            })
        }
        const allowedStatus = ["interested", "ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success : false,
                message : "Invalid status"
            })
        }
        const alreadyExists = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        if(alreadyExists){
            return res.status(400).json({
                success : false,
                message : "Connection request already exists"
            })
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()
        return res.status(201).json({
            success : true,
            message : "Connection request sent successfully",
            data
        })
    } catch(err) {
        return res.status(500).send("Error : " + err.message);
    }
}

const reviewConnectionRequest = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const {status, requestId} = req.params
        const allowedStatus = ["accepted", "rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success : false,
                message : "Invalid status"
            })
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUserId,
            status : "interested"
        })
        if(!connectionRequest){
            return res.status(404).json({
                success : false,
                message : "Connection request not found"
            })
        }
        connectionRequest.status = status
        await connectionRequest.save()
        return res.status(200).json({
            success : true,
            message : "Connection request reviewed successfully",
            connectionRequest
        })
    }catch(err){
        return res.status(500).send("Error : " + err.message);
    }
}

export {sendConnectionRequest, reviewConnectionRequest};