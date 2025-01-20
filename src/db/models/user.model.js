import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      set : (value)=> {
        return value
          .split(" ")
          .filter((word)=> word)
          .map(
            (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
          )
          .join(" ");
      },
    },
    email: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    confirmed : {
      type : Boolean,
      default: false
    },
    passChangedAt : {
      type : Date,
      default : null
    },
    isFreezed : {
      type : Boolean,
      default : false
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.index()
const userModel = mongoose.model("User", userSchema);

export default userModel;
