import { Router } from "express";
import { VA, AU } from "../../middleware/index.js";
import * as USER from './users.service.js'
import * as VD from './users.validation.js'

const userRouter = Router()
userRouter.post('/signup', VA.validateInput(VD.signupSchema, 'body'), USER.signup)
userRouter.get('/verify', VA.validateInput(VD.verifyEmailSchema, 'query'), USER.verifyEmail)
userRouter.post('/login', VA.validateInput(VD.loginSchema, 'body'), USER.login)
userRouter.get('/get-profile',VA.validateInput(VD.getProfileSchema,'headers'),AU.authentication, USER.getProfile)
userRouter.patch('/update-profile',VA.validateInput(VD.updataProfileSchema, ['headers', 'body']),AU.authentication, USER.updateProfile)
userRouter.patch('/update-password',VA.validateInput(VD.updatePasswordSchema, ['headers', 'body']),AU.authentication, USER.updatePassword)
userRouter.delete('/freeze',VA.validateInput(VD.freezeProfileSchema, 'headers'),AU.authentication, USER.freezeProfile)
userRouter.get('/share-profile', VA.validateInput(VD.shareProfileSchema, 'query'), USER.shareProfile)

export default userRouter
