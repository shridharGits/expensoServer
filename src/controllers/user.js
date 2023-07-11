const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.updateUser = async (req, res) => {
  const userKeys = Object.keys(req.body);
  const userValues = Object.values(req.body);
  const updatedUserValues = new Map();
  userKeys.forEach((key) => {
    updatedUserValues.push();
  });
  console.log(userKeys, userValues);
  console.log(req.user.id);
  try {
    User.findOneAndUpdate();
    return res.status(200).json({ msg: "Income Updated Successfully" });
  } catch (e) {
    return res.status(404).json({ msg: "Please Login First" });
  }
};
