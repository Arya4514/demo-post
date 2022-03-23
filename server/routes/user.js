const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorize = require("../middlewares/middlewares");

router.get("/user/all", authorize(['SUPER_ADMIN']), userController.getUsers);
router.get("/user/:id", authorize(['SUPER_ADMIN', 'USER']), userController.getUserByID);
router.put("/user", authorize(['SUPER_ADMIN', 'USER']), userController.editUser);


module.exports = router;
