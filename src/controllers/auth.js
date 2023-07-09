const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const user = new User(req.body);
  const userMonthlyIncome = req.body.monthlyIncome.split(":");
  user.monthlyIncome = new Map([[userMonthlyIncome[0], userMonthlyIncome[1]]]);
  user.password = await bcrypt.hash(user.password, 10);
  try {
    await user.save();
    user.password = undefined;
    return res.status(201).json({ msg: user });
  } catch (e) {
    return res.status(409).json({ msg: "Email already exists!" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id, email: user.email }, "kreev.in");
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ msg: "Invalid Email or Password" });
  }
};
