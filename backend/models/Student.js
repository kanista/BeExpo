const mongoose = require("mongoose");

const studentschema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "no photo",
    },
    linkedin: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    user:{
      type:mongoose.Types.ObjectId,
      required:true,
      ref:"User"
    }
  }

);

const Student = new mongoose.model("Student", studentschema);
module.exports = Student;
