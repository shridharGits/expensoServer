const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    type: String,
  },
  monthlyIncome: {
    type: Map,
    of: Number,
  },
  rule: {
    needs: {
      type: Number,
      default: 50,
    },
    wants: {
      type: Number,
      default: 30,
    },
    saving: {
      type: Number,
      default: 20,
    },
    loss: {
      type: Number,
      default: 0,
    },
  },
  isVerified: {
    type: Boolean,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
