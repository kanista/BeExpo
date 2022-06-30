const mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const SessionSchema=mongoose.Schema({
    time:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        required:true
    },
    meetingLink:
    {
        type:String,
        required:true
    },
    topic:
    {
        type:String,
        required:true
    },
    sessionDescription:
    {
        type:String,
        required:true
    },
    postedOn:{
        type:String,
        defualt:()=>new Date().toUTCString()
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    
},

);

module.exports=Session=mongoose.model("Session",SessionSchema);