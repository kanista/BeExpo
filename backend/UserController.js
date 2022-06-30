const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const User=require("./models/UserModel")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCntrl = {
  userregister: async (req, res) => {
    try {
      const { role, username, email, mobile, password, confirmpassword } =
        req.body;


      if (
        !role ||  !username || !email || !mobile ||  !password || !confirmpassword
      ) {
        return res.status(400).json({ error: "**please fill all the fields**" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "**invalid email check again**" });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: "**user already have exits**" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "**password  must be least 06 character**" });
      }

        if (password !== confirmpassword) {
          return res.status(400).json({ error: "**passsword do not match**" });
        }

      const passwordHash = await bcrypt.hash(password, 12);

      console.log(passwordHash);

      const newUser = new User({
        role,
        username,
        email,
        mobile,
        password: passwordHash,
        confirmpassword: passwordHash,
      });

      console.log(newUser);
      const saveUser = await newUser.save();

      console.log(saveUser);

      

      res.status(200).json({ msg: "Register succusfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
      
    }
  },

  checkauthentication : (req, res , next) => {
    res.json({ msg: "auth is working " });
  },


  checkuser: (req, res , next) => {
    res.json({ msg: "you are logged in do what you want  " });
  },

  checkAdmin: (req, res , next) => {
    res.json({ msg: "Hello Admin! your are logged in do what you want  " });
  },


  checkStudent: (req, res , next) => {
    res.json({ msg: "Hello Student! your are logged in do what you want  " });
  },


  checkCompany: (req, res , next) => {
    res.json({ msg: "Hello Company! your are logged in do what you want  " });
  },

  checkMentor: (req, res , next) => {
    res.json({ msg: "Hello Mentor! your are logged in do what you want  " });
  },





  userlogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "**please fill email and password**" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "**This email does not exist**" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || !email) {
        return res
          .status(400)
          .json({ error: "** Invalid email or password**" });
      }

      const token = jwt.sign({ _id: user._id , role:user.role }, process.env.JWT_SECRET_KEY);

     return res.json({ token,  user });

       return res.json({ message: "Login success!" });
      
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = userCntrl;