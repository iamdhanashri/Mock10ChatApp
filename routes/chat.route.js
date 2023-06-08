const bcrypt = require("bcrypt");
const express=require("express")
const jwt= require("jsonwebtoken");
const chatRouter=express.Router();

chatRouter.post("/send",async(req,res)=>{
    const { sender, recipient, content } = req.body;

    try {
      // Create a new message
      const newMessage = new Message({
        sender,
        recipient,
        content,
      });
      await newMessage.save();
  
      res.status(201).send({ message: 'Message sent successfully' });
    } catch (error) {
      console.log('Error sending message:', error);
    }
})

module.exports = {
    chatRouter,
  };