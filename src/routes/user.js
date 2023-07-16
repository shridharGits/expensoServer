const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");
const {
  updateUser,
  getUserById,
  addMontlyIncome,
} = require("../controllers/user");

router.patch("/user/profile/update", authenticateToken, updateUser);
router.get("/user/profile", authenticateToken, getUserById);
router.get("/user/update/monthlyIncome", authenticateToken, addMontlyIncome);

module.exports = router;
