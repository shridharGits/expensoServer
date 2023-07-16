const mongoose = require("mongoose");
const Helper = require("../utils/helper");
const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ruleTags: {
    needs: {
      type: Number,
      default: 0,
    },
    wants: {
      type: Number,
      default: 0,
    },
    saving: {
      type: Number,
      default: 0,
    },
    loss: {
      type: Number,
      default: 0,
    },
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: 0,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
