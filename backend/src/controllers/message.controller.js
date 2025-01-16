import User from "../models/user.models"
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json({filteredUsers})
    } catch (error) {
        console.error("Error in getUsersForSideBar", error.message)
        res.status(500).json({error: "Internal Server Error"})
        
    }
}

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({ //find messages, and these are the parameters

            $or:[ // function to choose between the parameters
                {senderId:myId, receiverId:userToChatId}, //where the senderid is mine and the receiverid is the user to chat with 
                {senderId:userToChatId, reciever:myId} //where the senderid the the user i chatted with and the reciver is my user
            ]
        })

        res.status(200).json(messages)

    } catch (err){
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({  error: "Internal Server Error"})
    }
}