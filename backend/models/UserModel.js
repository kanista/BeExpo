const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema(
  {
    role: {
        type: String,
        enum : ['student','mentor','company','admin'],
        default: 'student'
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    references: { type: [mongoose.Types.ObjectId], refPath: 'modelType' },
    modelType: {  type: String, enum: ['Student', 'Mentor', 'Company' ], required: true }

  },
  {
    timestamps: true,
  }
);

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(this.password,12);
    this.password = hash;
    return next();
  });

  
const userModel = new mongoose.model("User", userschema);
module.exports = userModel;