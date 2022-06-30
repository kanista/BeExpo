const mongoose= require("mongoose");

const MentorSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required: true
    },
    language:{
        type:Array,
        required:true
    },
    expertise:{
        type:Array,
        required:true
    },
    workPlace:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true
    },
    story:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
      }
})

module.exports=Mentor=mongoose.model("Mentor",MentorSchema);