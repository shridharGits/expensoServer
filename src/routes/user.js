const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");
const { updateUser } = require("../controllers/user");

router.patch("/user/update", authenticateToken, updateUser);

module.exports = router;
