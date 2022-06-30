const express = require("express");
const router = express.Router();
const userCntrl=require("./UserController")
const {verifyUser,auth,verifyAdmin,verifyMentor,verifyCompany,verifyStudent} =  require("./Auth")

router.post("/userregister" , userCntrl.userregister);
router.post("/userlogin" , userCntrl.userlogin)
router.get("/checkauthentication" , auth,  userCntrl.checkauthentication)
router.get("/checkuser/:id" , verifyUser , userCntrl.checkuser)
router.get("/checkuser/:id" , verifyAdmin , userCntrl.checkAdmin)
router.get("/checkuser/:id" , verifyStudent , userCntrl.checkStudent)
router.get("/checkuser/:id" , verifyCompany , userCntrl.checkCompany)
router.get("/checkuser/:id" , verifyMentor , userCntrl.checkMentor)





module.exports = router