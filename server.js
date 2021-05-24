require("dotenv").config();
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = require("./router");
const flash = require("express-flash");
const session = require("express-session");
const passportInitialize = require("./passport-config.js");

const users = [];
const app = express();
passportInitialize(
  passport,
  (email) => users.find((user) => user.user_mail == email),
  (id) => {
    users.find((user) => user.id === id);
  }
);

app.set("view-engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    users.push({
      id: Date.now().toString(),
      user_name: req.body.user_name,
      user_mail: req.body.user_mail,
      user_pass: await bcrypt.hash(req.body.user_pass, 10),
    });
    res.redirect("/login");
    console.log(users);
  } catch {
    res.redirect("/register");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.use("/", router);
app.listen(process.env.PORT || 8080, process.env.HOST, () => {
  console.log(`Server working: ${process.env.PORT || 8080}`);
});
