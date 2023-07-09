const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  name: {
    first: {
      type: String,
      trim: true,
    },
    last: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String
  },
  monthlyIncome: [Map],
  rule: {
    needs: {
      type: String,
      default: "50",
    },
    wants: {
      type: String,
      default: "30",
    },
    saving: {
      type: String,
      default: "20",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
