// IMPORT PACKAGES
const router = require("express").Router();
const razorPay = require("razorpay");
const crypto = require("crypto");

// DOTENV CONFIG
// require("dotenv").config();

// RAZORPAY IMSTANCE
var instance = new razorPay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

// POST REQUEST TO /orders WHICH RETURNS `product id`
router.post("/orders", (req, res) => {
  const param = {
    amount: req.body.amount * 100, // 100paise = 1rupee
    receipt: Math.random().toString(16).substr(2, 20),
    currency: "INR",
  };
  console.log(param);
  instance.orders.create(param, (err, order) => {
    if (err) {
      // console.log(err);
      return res.send(err);
    }
    res.json({ id: order.id, amount: order.amount, currency: order.currency });
    // console.log(order);
  });
});

// POST REQUEST TO /validate WHICH CHECKS SIGNATURE PROVIDED BY RAZORPAY
router.post("/validate", (req, res) => {
  const generated_signature = crypto.createHmac(
    "sha256",
    process.env.RAZOR_PAY_KEY_SECRET
  );
  generated_signature.update(
    req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id
  );
  if (generated_signature.digest("hex") === req.body.razorpay_signature) {
    // console.log('success');
    return res.json({ msg: "success" });
  } else {
    return res.json({ msg: "failure" });
  }
});

router.get("/", (req, res) => {
  res.json({ msg: "CHECK FOR WORKING" });
});

// EXPRTING THE ROUTERS
module.exports = router;
