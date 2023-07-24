const Constants = require("../utils/constants.js");
const Invoice = require("../models/invoice");
const User = require("../models/user.js");
const Helper = require("../utils/helper.js");

exports.getInvoice = async (req, res) => {
  const invoiceId = req.params.id;
  const userId = req.params.id;
  try {
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      userId,
    });
    return invoice
      ? res.status(201).json({ invoice })
      : res.status(403).json({ msg: "Not Authorized" });
  } catch (e) {
    console.log(e.message);
    return res.status(404).json({ msg: "No Invoice Found" });
  }
};

exports.addInvoice = async (req, res) => {
  // ruleTags can have needs and wants field and value inside it
  // so set price as total(needs + wants);
  // use same invoie schema for profit loss
  const { needs, wants } = req.body;
  try {
    const invoice = new Invoice(req.body);
    invoice.price = (needs || 0) + (wants || 0);
    invoice.ruleTags.needs = needs || 0;
    invoice.ruleTags.wants = wants || 0;
    invoice.userId = req.user.id;
    invoice.date = new Date();
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
  const userId = req.params.id;
  const invoice = await Invoice.findById({ _id: invoiceId, userId });
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
  const userId = req.params.id;
  try {
    const isInvoiceRemoved = await Invoice.findOneAndDelete({
      _id: invoiceId,
      userId,
    });
    return isInvoiceRemoved
      ? res.status(200).json({ msg: "Invoice Removed Successfully" })
      : res.status(404).json({ msg: "No Invoice Found To Remove" });
  } catch (e) {
    return res.status(404).json({ msg: "No Invoice Found To Remove" });
  }
};

exports.getAllInvoices = async (req, res) => {
  const userId = req.params.id;
  try {
    const invoices = await Invoice.find({ userId });
    if (!invoices) {
      return res.status(404).json({ msg: "No Invoices" });
    } else {
      return res.status(200).json({ invoices });
    }
  } catch (e) {
    return res.status(404).json({ msg: "No Invoices" });
  }
};

exports.getRuleStatistics = async (req, res) => {
  // 1. get user by req.user.id, extract his rule, monthlyIncome
  // 2. get all users transactions where day is specified and and has wants and needs
  // 3. send date in yyyy-mm-dd format
  // console.log(new Date(new Date().toString()));
  const userId = req.user.id;
  const toDay = new Date(req.body.toDay ?? new Date());
  const fromDay = new Date(req.body.fromDay ?? toDay);
  fromDay.setDate(fromDay.getDate() - 1);

  try {
    const user = await User.findById({ _id: userId });
    const invoices = await Invoice.find({
      userId,
      $or: [
        {
          createdAt: {
            $gte: fromDay,
            $lte: toDay,
          },
        },
        {
          date: {
            $gte: fromDay,
            $lte: toDay,
          },
        },
      ],
    });
    if (user && invoices.length > 0) {
      const numberOfDaysInMonth = Helper.getNumberOfDaysInMonth(
        toDay.getMonth() + 1,
        toDay.getFullYear()
      );
      const dailyBudget =
        [...user.monthlyIncome].pop()[1] / numberOfDaysInMonth;

      let dailyTotalWants = 0,
        dailyTotalNeeds = 0;
      for (let i = 0; i < invoices.length; i++) {
        dailyTotalNeeds += invoices[i].ruleTags.needs;
        dailyTotalWants += invoices[i].ruleTags.wants;
      }

      const needsLeft = dailyBudget * (user.rule.needs / 100) - dailyTotalWants;
      const wantsLeft = dailyBudget * (user.rule.wants / 100) - dailyTotalNeeds;
      const savingsDone = dailyBudget - (needsLeft + wantsLeft);

      const dailyBudgetStats = {
        needsLeft,
        wantsLeft,
        savingsDone,
        invoices,
      };
      // return res.status(200).json({ dailyBudgetStats });
      return res.status(200).json({ dailyBudgetStats });
    } else {
      return res.status(404).json({ msg: `something went wrong` });
    }
  } catch (e) {
    return res
      .status(404)
      .json({ msg: `such user or invoices doesn't exists` });
  }
};
// dont play