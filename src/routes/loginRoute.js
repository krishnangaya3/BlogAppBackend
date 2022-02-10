const express = require("express");
const loginRouter = express.Router();
const UserInfo = require("../model/UserDB");

loginRouter.get("/", function (req, res) {
  res.render("login", {});
});

loginRouter.post("/verifyuser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  console.log("verifyuser req body::", req.body);
  let email = req.body.email;
  let password = req.body.password;

  UserInfo.findOne({ email: email, password: password }, function (err, user) {
    console.log(user);
    res.json(user);
  });
});

module.exports = loginRouter;
