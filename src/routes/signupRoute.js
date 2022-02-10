const express = require("express");
const signupRouter = express.Router();
const UserInfo = require("../model/UserDB");

signupRouter.get("/", function (req, res) {
  res.render("signup", {});
});

signupRouter.post("/adduser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  console.log("adduser req body::", req.body);
  var newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(newUser);
  const userData = new UserInfo(newUser);
  userData.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
      //res.redirect("http://localhost:3000/login");
    }
  });
});

module.exports = signupRouter;
