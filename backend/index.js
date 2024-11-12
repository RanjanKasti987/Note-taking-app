const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./config/passport.config");
const connectDB = require("./config/db.config");
require("dotenv").config();
connectDB();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["https://sturdy-broccoli-wxq4gxrw496257x4-4200.app.github.dev/"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("auth", require("./controller/auth.controller"));
app.use("notes", require("./controller/note.controller"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
