const mongoose= require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const ApplyProjectSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    contactno:{
        type:String,
        required: true
    },
    linkedin:{
        type:String,
        required: true
    },
    cv:{
        type:String,
        required: true
    },
    question:{
        type:String,
        required: true
    },
    answer:{
        type:String,
        required: false
    },
    appliedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required:true
    } ,
    applyFor:{
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required:true
    },
    appliedOn:{
        type:String,
        default:()=>new Date().toUTCString()
    }
})
module.exports=ApplyProject= mongoose.model("ApplyProject",ApplyProjectSchema);