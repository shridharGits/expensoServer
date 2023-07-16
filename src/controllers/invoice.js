const Helper = require("../utils/helper");
const Constants = require("../utils/constants.js");
const Invoice = require("../models/invoice");
const { default: mongoose } = require("mongoose");

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id });
    if (!invoices) {
      return res.status(404).json({ msg: "No Invoices" });
    } else {
      return res.status(200).json({ invoices });
    }
  } catch (e) {
    return res.status(404).json({ msg: "No Invoices" });
  }
  return res.status(200).send(`December: ${JSON.stringify(req.user)}`);
};

exports.addInvoice = async (req, res) => {
  // ruleTags can have needs and wants field and value inside it
  // so set price as total(needs + wants);
  // use same invoie schema for profit loss
  const { needs, wants } = req.body;
  try {
    const invoice = new Invoice(req.body);
    console.log(invoice);
    invoice.price = (needs || 0) + (wants || 0);
    invoice.ruleTags.needs = needs || 0;
    invoice.ruleTags.wants = wants || 0;
    invoice.userId = req.user.id;
    invoice.date = Date.now();
    console.log("TotalPrice", invoice);
    await invoice.save();
    return res.status(201).json({ invoice });
  } catch (e) {
    return res.status(500).json({ msg: "Something Went Wrong" });
  }
};

exports.updateInvoice = async (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const invoiceId = req.params.id;
  const invoice = await Invoice.findById({ _id: invoiceId });
  let need = 0;
  let want = 0;
 
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == Constants.RULETAG.NEEDS) {
      need = values[i];
    } else if (keys[i] == Constants.RULETAG.WANTS) {
      want = values[i];
    } else invoice[keys[i]] = values[i];
  }

  if (need || want) {
    invoice.ruleTags.needs = need || 0;
    invoice.ruleTags.wants = want || 0;
    invoice.price = (need || 0) + (want || 0);
  }
  try {
    await invoice.save();
    return res.status(202).json({ invoice });
  } catch (e) {
    return res.status(404).json({ msg: "No Invoice Fount To Edit" });
  }
};

exports.removeInvoice = async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const isInvoiceRemoved = await Invoice.findOneAndDelete({ _id: invoiceId });
    console.log(isInvoiceRemoved);
    return isInvoiceRemoved
      ? res.status(200).json({ msg: "Invoice Removed Successfully" })
      : res.staus(404).josn({ msg: "No Invoice Found To Remove" });
  } catch (e) {
    return res.status(404).json({ msg: "No Invoice Found To Remove" });
  }
};

exports.getInvoice = async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      userId: req.user.id,
    });
    return invoice
      ? res.status(201).json({ invoice })
      : res.staus(404).josn({ msg: "No Invoice Found To Remove" });
  } catch (e) {
    return res.status(404).json({ msg: "No Invoice Found" });
  }
};
