const express = require("express");
const router = express.Router();
const companyCntrl=require("./CompanyControl")


router.post("/companyregister", companyCntrl.companyregister);

module.exports = router;