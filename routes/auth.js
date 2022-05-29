const express = require("express");

const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getuser = require("../Middleware/getuser");
const SECRET_KEY = "Ranjit";
//Available Routes
router.post(
  "/register",
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("name").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //generating salt and hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      //checking the user with same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ err: "Already email exists" });
      }
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      //Generatind and sending auth token
      const AuthToken = jwt.sign(data, SECRET_KEY);
      res.json({ AuthToken });
    } catch (error) {
      res.json(error);
    }
  }
);
//login routes
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //getting email and password from the body
      const { email, password } = req.body;
      const userD = await User.findOne({ email });
      if (!userD) {
        return res.status(400).json({ error: "Try with correct credientials" });
      }
      const passwordComp = await bcrypt.compare(password, userD.password);
      if (!passwordComp) {
        return res.status(400).json({ error: "Try with correct credientials" });
      }

      const Data = {
        user: {
          id: userD.id,
        },
      };

      const AUthToken = jwt.sign(Data, SECRET_KEY);
      res.json({ AUthToken });
    } catch (error) {
      console.log(error);
    }
  }
);

//ROUTE:3 getting the loggedin user details
router.post("/getuser", getuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
