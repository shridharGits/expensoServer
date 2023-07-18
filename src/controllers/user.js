const User = require("../models/user");
const Constants = require("../utils/constants");
const Helper = require("../utils/helper");

exports.getUserById = async (req, res) => {
  const userId = req?.user?.id;
  try {
    const user = await User.findById({ _id: userId });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.staus(404).json({ msg: "User Not Found" });
  } catch (e) {
    return res.status(404).json({ msg: "User Not Found" });
  }
};

exports.updateUser = async (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const userId = req.user.id;
  const user = await User.findById({ _id: userId });
  let needs, wants, saving;
  // add a check in frontend, total should be 100;
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case Constants.RULETAG.NEEDS:
        needs = values[i];
        break;
      case Constants.RULETAG.WANTS:
        wants = values[i];
        break;
      case Constants.RULETAG.SAVING:
        saving = values[i];
        break;
      case "first":
        user.name.first = values[i];
        break;
      case "last":
        user.name.last = values[i];
        break;
      default:
        user[keys[i]] = values[i];
        break;
    }
  }
  if (needs + wants + saving == 100) {
    user.rule.needs = needs;
    user.rule.wants = wants;
    user.rule.saving = saving;
  } else {
    return res
      .status(405)
      .json({ msg: "Needs, Wants, Saving Total Should Be 100" });
  }
  try {
    await user.save();
    return res.status(202).json({ user });
  } catch (e) {
    return res.status(404).json({ msg: "Such Email Exits" });
  }
};

exports.addMontlyIncome = async (req, res) => {
  const userId = req.user.id;
  const monthlyIncome = req.body.monthlyIncome;
  try {
    const user = await User.findById({ _id: userId });
    const today = new Date();
    user.monthlyIncome.set(
      `${today.getMonth() + 1}-${today.getFullYear()}`,
      monthlyIncome
    );
    await user.save();
  } catch (e) {
    return res.status(501).json({ msg: "Server Error" });
  }
};
