const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");
const {
  getAllInvoices,
  addInvoice,
  updateInvoice,
} = require("../controllers/invoice");

router.get("/invoices", authenticateToken, getAllInvoices);
router.post("/invoices/add", authenticateToken, addInvoice);
router.patch("/invoices/:id", authenticateToken, updateInvoice);

module.exports = router;
