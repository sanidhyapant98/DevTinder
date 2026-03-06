import {ConnectionRequest} from "../models/connectionRequestModel.js"

const getConnectionRequests = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUserId,
            status : "interested"
        }).populate("fromUserId", "firstName, lastName, profileUrl")
        if(!connectionRequests){
            return res.status(404).send("No connection requests found")
        }
        return res.status(200).json(connectionRequests)
    }catch(err){
        return res.status(500).send("Error : " + err.message)
    }
}

const viewConnections = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUserId},
                {toUserId : loggedInUserId}
            ],
            status : "accepted"
        }).populate("fromUserId", "firstName, lastName, profileUrl")
        if(!connections){
            return res.status(404).send("No connections found")
        }
        return res.status(200).json(connections)
    }catch(err){
        return res.status(500).send("Error : " + err.message)
    }
}

export { getConnectionRequests, viewConnections }