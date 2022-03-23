const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controller/authController");

router.post("/auth/sign-in", AuthenticationController.signIn);
router.post("/auth/sign-up", AuthenticationController.signUp);

module.exports = router;
