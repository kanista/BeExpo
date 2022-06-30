const express = require("express");
const Router = express.Router();
const Company = require("./models/Company");

const companyCntrl = {
  companyregister: async (req, res) => {
    try {
      const company = new Company(req.body);
      await company.save();
      res.status(200).json({ msg: company });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  companylogin: async (req, res) => {
    try {
      const company = company.findOne({
        companymail: req.body.companymail,
        password: req.body.password,
      });

      if (company) {
        res.status(200).json({ msg: company });
      } else {
        return res.status(400).json({ msg: "Invalid Credentails" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

module.exports = companyCntrl;