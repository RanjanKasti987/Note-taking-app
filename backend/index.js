const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./config/passport.config");
const connectDB = require("./config/db.config");
const auth = require("./midddleware/auth.middleware");
const User = require("./model/user.model");
require("dotenv").config();
connectDB();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:4200", "https://github.com"],
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
    cookie: {
      name: "my_session_cookie",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", (req, res, next) => {
//   res.send("Hello World!");
// });

app.use("/check-auth", auth, (req, res) => {
  res.status(200).json({ message: "You are authenticated" });
});
app.use("/auth", require("./controller/auth.controller"));
app.use("/notes", require("./controller/note.controller"));
app.use("/me", auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
