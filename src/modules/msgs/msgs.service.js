import msgModel from '../../db/models/msg.model.js'
import userModel from '../../db/models/user.model.js'
import {ER} from '../../utils/index.js'
// -------------------SEND MESSAGE----------------------------------
export const sendMessage = ER.asyncHandler(async (req,res,next)=>{
    const {receiverId, content} = req.body
    const user = await userModel.findById(receiverId)
    if(!user){
        return next(new Error("user not found", {cause : 404}))
    }
    const message = await msgModel.create({content, receiverId})
    res.status(201).json({msg : 'success', message})
})
// -----------------GET ALL MESSAGES--------------------------------
export const getAllMessages = ER.asyncHandler(async (req,res,next)=>{
    const messages = await msgModel.find({receiverId : req.user._id})
    if(!messages){
        return next(new Error("no messages available", {cause : 404}))
    }
    res.status(200).json({msg : 'success', messages})
})
// ----------------GET SINGLE MESSAGE-------------------------------
export const getSingleMessage = ER.asyncHandler(async (req,res,next)=>{
    const {id} = req.body
    const message = await msgModel.findOne({receiverId : req.user._id, _id : id})
    if(!message){
        return next(new Error("message not found", {cause : 404}))
    }
    res.status(200).json({msg : 'success', message})
})
// --------------------DELETE MESSAGE-------------------------------
export const deleteMessage = ER.asyncHandler(async (req,res,next)=>{
    const {id} = req.body
    const message = await msgModel.findOneAndDelete({receiverId : req.user._id, _id : id})
    if(!message){
        return next(new Error("message not found", {cause : 404}))
    }
    res.status(200).json({msg : 'success', message})
})