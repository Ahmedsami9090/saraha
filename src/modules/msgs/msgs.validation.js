import Joi from 'joi'

export const sendMessageSchema = Joi.object({
    receiverId : Joi.string().required(),
    content : Joi.string().min(3).max(200).required()
})
export const getAllMessagesSchema = Joi.object({
    token : Joi.string().required()
})
export const getOneMessageSchema = {
    headers: Joi.object({
        token : Joi.string().required()
    }).unknown(true),
    body :Joi.object({
        id : Joi.string().required(),
    }).unknown(false)
}
export const deleteMessageSchema = {
    headers: Joi.object({
        token : Joi.string().required()
    }).unknown(true),
    body :Joi.object({
        id : Joi.string().required(),
    }).unknown(false)
}