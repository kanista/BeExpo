const mongoose= require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const ProjectSchema= mongoose.Schema({

    title:
    {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    technologies:{
        type:Array,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    scenario:{
        type:String,
        required:true
    },
    scenarioduration: { 
        type:Number,
        required:true
    },
    postedprojectdate :{
        type:String,
        defualt:()=>new Date().toUTCString()
    },
    registerbeforedate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        // required:true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
},
    {
    timestamps: true,
    }
);

module.exports=Project= mongoose.model("Project",ProjectSchema);