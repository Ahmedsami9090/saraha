import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    receiverId : {
        type : mongoose.Types.ObjectId,
        required : true
    }
},
{
    timestamps : true
})

const msgModel = mongoose.model('Msg', msgSchema)

export default msgModel