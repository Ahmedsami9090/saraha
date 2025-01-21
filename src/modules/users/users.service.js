import userModel from "../../db/models/user.model.js";
import { VM } from "../../middleware/index.js";
import { Hsh, TKN, EN, ER } from "../../utils/index.js";
// ----------------------------SIGNUP-------------------------------
export const signup = ER.asyncHandler(async (req, res, next) => {
  const { password, phone, name, email } = req.body;
  const hashedPassword = await Hsh.hashData(password);
  const encryptedPhone = await EN.encryptData(phone);
  const user = await userModel.create({
    email,
    name,
    password: hashedPassword,
    phone: encryptedPhone,
  });
  const token = await TKN.createToken(
    user._id,
    user.email,
    process.env.TOKEN_SECRET_KEY_VERIFY_EMAIL,
    "6h"
  );
  const sendConfirmMail = await VM.sendVerifyLink(user.email, token);
  res.status(200).json({
    msg: "user created successfully",
    emailSent: sendConfirmMail,
    user
  });
});
// --------------------------VERIFY EMAIL-------------------------------
export const verifyEmail = ER.asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  console.log(token);
  
  const decode = await TKN.verifyToken(
    token,
    process.env.TOKEN_SECRET_KEY_VERIFY_EMAIL
  );
  console.log('decode', decode);
  
  const user = await userModel.findOneAndUpdate(
    { _id: decode._id },
    { $set: { confirmed: true } },
    {new : true}
  );
  res.status(200).json({ confirmed: user.confirmed });
});
// ----------------------------LOGIN-----------------------------------
export const login = ER.asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not found", { cause: 404 }));
  }
  if (!(await Hsh.hashCompare(user.password, password))) {
    return next(new Error("incorrect password", { cause: 409 }));
  }
  if (user.isFreezed){
    return next(new Error("Profile freezed", {cause : 403}))
  }
  const token = await TKN.createToken(
    user._id,
    user.email,
    user.role == "admin"
      ? process.env.TOKEN_SECRET_KEY_ADMIN
      : process.env.TOKEN_SECRET_KEY_USER
  );
  res.status(200).json({
    msg: "success",
    token: user.role == "admin" ? `Admin ${token}` : `Bearer ${token}`,
  });
});
// --------------------------GET PROFILE--------------------------------
export const getProfile = ER.asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  res.status(200).json({ user: {
    name : user.name,
    email : user.email,
    phone : await EN.decryptData(user.phone),
    confirmed : user.confirmed
  } });
});
// ------------------------UPDATE PROFILE------------------------------
export const updateProfile = ER.asyncHandler(async (req,res,next)=>{
  let updatedData = {}
  if(req.body.name && req.body.phone){
    updatedData = {name: req.body.name, phone : await EN.encryptData(req.body.name)}
  }else if(req.body.name){
    updatedData = {name: req.body.name}
  }else{
    updatedData = {phone : await EN.encryptData(req.body.name)}
  }
  const user = await userModel.findByIdAndUpdate(req.user._id, updatedData, {new : true})
  res.status(200).json({msg : 'success', user})
})
// --------------------UPDATE PASSWORD---------------------------------
export const updatePassword = ER.asyncHandler(async (req,res,next)=>{
  const {oldPassword, newPassword} = req.body
  if(oldPassword === newPassword){
    return next(new Error("password can't be same as old one", {cause : 409}))
  }
  if(!await Hsh.hashCompare(req.user.password, oldPassword)){
    return next(new Error("incorrect password", {cause : 401}))
  }
  const hashed = await Hsh.hashData(newPassword)
  const user = await userModel.findByIdAndUpdate(req.user._id, {password : hashed, passChangedAt : Date.now()}, {new : true})
  res.status(200).json({mag : 'success', user})
})
// ------------------FREEZE PROFILE-----------------------------------
export const freezeProfile = ER.asyncHandler(async (req,res,next)=>{
  const user = await userModel.findByIdAndUpdate(req.user._id, {isFreezed : true}, {new : true})
  res.status(200).json({msg : 'success', user})
})
export const shareProfile = ER.asyncHandler(async (req,res,next)=>{
  const {id} = req.query
  const user = await userModel.findById(id).select("name email")
  if(!user){
    return next(new Error("user not found", {cause : 404}))
  }
  res.status(200).json({mag : 'success', user})
})
// -----------------REACTIVATE PROFILE--------------------------------
