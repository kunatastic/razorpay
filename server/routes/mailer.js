// require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

const Router = require("express").Router();
const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};
const transactionSchema = new mongoose.Schema(
  {
    callback: {
      razorpay_payment_id: requiredString,
      razorpay_order_id: requiredString,
      razorpay_signature: requiredString,
      amount: {
        type: Number,
        required: true,
      },
    },
    email: requiredString,
    name: requiredString,
  },
  {
    timestamps: true,
  }
);
const transactionModel = new mongoose.model("transaction", transactionSchema);

Router.get("/", (req, res) => {
  res.json({ msg: "CHECK FOR WORKING" });
});

Router.post("/sender", async (req, res) => {
  // console.log(req.body);

  const instance = new transactionModel(req.body);
  const newTransaction = await instance.save();
  console.log(newTransaction);

  const output = `
    Dear ${req.body.name},

    This donation will be of great use for us. 
    Thankyou for such a generorous Donation. 
    This email is to confirm your donation. This is a automated generated email.

    Donation Details:
    Name: ${req.body.name}
    Email: ${req.body.email}
    Amount: ${req.body.callback.amount / 100}
    
    Thank you
    Kunal
  `;

  let info = sendEmail({
    subject: "Confirmation for you Donation! ❤",
    text: output,
    to: req.body.email,
    from: process.env.EMAIL,
  });
  res.json({
    msg: "Mailed send☮",
  });
});

module.exports = Router;
