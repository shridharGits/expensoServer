const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/auth");

router.post("/users/signup", signUp);
router.post("/users/signin", signIn);

module.exports = router;
