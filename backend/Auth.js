const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ msg: "**Invalid Authentication**" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res.status(400).json({ msg: "**Invalid Authentication**" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
    
const verifyUser = (req, res, next) => {
  auth(req, res, next, () => {
    if (
      req.user.id === req.params.id ||
      req.user.role == "company" ||
      req.user.role == "admin" ||
      req.user.role == "mentor" ||
      req.user.role == "student"
    ) {
      next();
    } else {
      return res
        .status(500)
        .json({ msg: "**sorry your unauthorized person**" });
    }
  });
};

const verifyStudent = (req, res, next) => {
  auth(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role == "company") {
      next();
    } else {
      return res
        .status(500)
        .json({ msg: "**sorry your unauthorized person**" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.id === req.params.id || req.user.role == "admin") {
      next();
    } else {
      return res
        .status(500)
        .json({ msg: "**sorry your unauthorized person**" });
    }
  });
};

const verifyMentor = (req, res, next) => {
  auth(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role == "mentor") {
      next();
    } else {
      return res
        .status(500)
        .json({ msg: "**sorry your unauthorized person**" });
    }
  });
};

const verifyCompany = (req, res, next) => {
  auth(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role == "company") {
      next();
    } else {
      return res
        .status(500)
        .json({ msg: "**sorry your unauthorized person**" });
    }
  });
};

module.exports = {
  auth,
  verifyUser,
  verifyCompany,
  verifyMentor,
  verifyAdmin,
  verifyStudent,
};