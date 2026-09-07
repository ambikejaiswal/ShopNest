const express = require('express');
const { createOrder, verfiyPayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verfiyPayment);

module.exports = router;
