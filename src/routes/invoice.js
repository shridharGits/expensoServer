const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");
const { getAllInvoices } = require("../controllers/invoice");

router.get("/invoices", authenticateToken, getAllInvoices);

module.exports = router;
