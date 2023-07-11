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
      type: String,
      default: "0",
    },
    wants: {
      type: String,
      default: "0",
    },
    saving: {
      type: String,
      default: "0",
    },
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Helper.getCurrentDate_ddmmyyyy_Format(),
  },
});

module.exports = mongoose.Schema("Invoice", invoiceSchema);
