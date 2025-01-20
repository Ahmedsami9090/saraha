import { Router } from "express";
import * as MSGS from './msgs.service.js'
import * as VD from './msgs.validation.js'
import {AU, VA} from '../../middleware/index.js'


const msgsRouter = Router()

msgsRouter.post('/send-message', VA.validateInput(VD.sendMessageSchema, 'body'), MSGS.sendMessage)
msgsRouter.get('/get-all', VA.validateInput(VD.getAllMessagesSchema, 'headers'),AU.authentication, MSGS.getAllMessages)
msgsRouter.get('/get-one', VA.validateInput(VD.getOneMessageSchema, ['headers', 'body']),AU.authentication, MSGS.getSingleMessage)
msgsRouter.delete('/delete', VA.validateInput(VD.deleteMessageSchema, ['headers', 'body']),AU.authentication, MSGS.deleteMessage)


export default msgsRouter