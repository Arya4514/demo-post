const express = require("express");
const router = express.Router();
const User = require("./user");
const Authentication = require("./auth");
const Post = require("./post");



router.get("/", function (req, res, next) {
    res.send('Express Server is Running...')
});

router.use(
    "/",
    Authentication,
    User,
    Post
);

module.exports = router;
