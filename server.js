require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = require("./router");

const app = express();

const users = [];

app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.listen(process.env.PORT || 8080, process.env.HOST, () => {
  console.log(`Server working: ${process.env.PORT || 8080}`);
});
