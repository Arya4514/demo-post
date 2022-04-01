const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post('/create-payment-intent', paymentController.payment)
router.get('/transaction/:id', paymentController.transaction)


module.exports = router;