const mongoose = require("mongoose");

const companyschema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
    },
    website: {
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
    appliedcandiates: {
      type: [],
    },
    user:{
      type:mongoose.Types.ObjectId,
      required:true,
      ref:"User"
    }
  },
  {
    timestamps: true,
  }
);

const companyModel = new mongoose.model("Company", companyschema);
module.exports = companyModel;
