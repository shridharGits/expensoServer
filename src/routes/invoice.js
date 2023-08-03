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

router.get("/expenses", authenticateToken, getAllInvoices);
router.get("/expenses/:id", authenticateToken, getInvoice);
router.post("/expenses/add", authenticateToken, addInvoice);
router.patch("/expenses/:id", authenticateToken, updateInvoice);
router.delete("/expenses/:id", authenticateToken, removeInvoice);
router.get("/dashboard", authenticateToken, getRuleStatistics);

module.exports = router;
