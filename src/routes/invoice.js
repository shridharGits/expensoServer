const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");
const {
  getAllInvoices,
  addInvoice,
  updateInvoice,
  removeInvoice,
  getInvoice,
  getRuleStatistics,
} = require("../controllers/invoice");

router.get("/invoices", authenticateToken, getAllInvoices);
router.get("/invoices/:id", authenticateToken, getInvoice);
router.post("/invoices/add", authenticateToken, addInvoice);
router.patch("/invoices/:id", authenticateToken, updateInvoice);
router.delete("/invoices/:id", authenticateToken, removeInvoice);
router.get("/dashboard", authenticateToken, getRuleStatistics);

module.exports = router;
