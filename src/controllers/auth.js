require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Helper = require("../utils/helper");

exports.signUp = async (req, res) => {
  const user = new User(req.body);
  const today = new Date();
  user.monthlyIncome = new Map([
    [`${today.getMonth() + 1}-${today.getFullYear()}`, req.body.monthlyIncome],
  ]);
  user.password = await bcrypt.hash(user.password, 10);
  user.name.first = req.body.firstname;
  user.name.last = req.body.lastname;
  user.rule.needs = req.body.needs;
  user.rule.wants = req.body.wants;
  user.rule.saving = req.body.saving;
  try {
    await user.save();
    user.password = undefined;
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(409).json({ msg: "Email already exists!" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id, email: user.email }, "kreev.in");
    console.log("login successful");
    return res.status(200).json({ token });
  } else {
    console.log("Invalid Email or Password");
    return res.status(401).json({ msg: "Invalid Email or Password" });
  }
};

exports.authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRENT_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).send("User not authenticated");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).send("User not authenticated");
  }
};
