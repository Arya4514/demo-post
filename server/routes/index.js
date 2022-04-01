const express = require("express");
const router = express.Router();
const User = require("./user");
const Authentication = require("./auth");
const Post = require("./post");
const Payment = require("./payment");




router.get("/", function (req, res, next) {
    res.send('Express Server is Running...')
});

router.use(
    "/",
    Authentication,
    User,
    Post,
    Payment
);

module.exports = router;
