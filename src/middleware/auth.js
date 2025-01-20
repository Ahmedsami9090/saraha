import userModel from "../db/models/user.model.js";
import { ER, TKN } from "../utils/index.js";

export const authentication = ER.asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  const [ prefix, signature ] = token.split(" ");
  let decoded = "";
  if (prefix === "Admin") {
    decoded = await TKN.verifyToken(
      signature,
      process.env.TOKEN_SECRET_KEY_ADMIN
    );
  } else if (prefix === "Bearer") {
    decoded = await TKN.verifyToken(
      signature,
      process.env.TOKEN_SECRET_KEY_USER
    );
  } else {
    return next(new Error("Invalid Token", { cause: 498 }));
  }
  const user = await userModel.findById(decoded._id);
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  if (user.passChangedAt?.getTime() > (decoded.iat * 1000)){
    return next(new Error("Token expired, please log in again.", {cause : 498}))
  }
  if (user.isFreezed){
    return next(new Error ("Profile freezed", {cause : 403}))
  }
  req.user = user;
  req.role = prefix;
  next();
});

export const authorization = ER.asyncHandler(async (accessRole) => {
  return (req, res, next) => {
    if (!req.role === accessRole) {
      return next(new Error("Access denied", { cause: 401 }));
    }
    next()
  };
});
