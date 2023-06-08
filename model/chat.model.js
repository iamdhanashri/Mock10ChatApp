
const mongoose=require("mongoose")

const chatSchema=mongoose.Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
})

const ChatModel=mongoose.model("chat",chatSchema)

module.exports={
    ChatModel
}