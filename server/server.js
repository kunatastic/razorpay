// IMPORT MODULES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

// require("dotenv").config();

// IMPORT PERSONAL MODULES
const routes = require("./routes/Routes"); // Validate and order Route
const mailer = require("./routes/mailer"); // Mailing the confirmation

const app = express();

// MONGOOSE CONNECTION
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to DB!!");
  }
);

// MIDDLEWARES
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: process.env.FRONT_END_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use("/mail", mailer);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
