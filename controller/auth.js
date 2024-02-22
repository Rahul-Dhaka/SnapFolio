const myPassport = require("../auth/myPassport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.getLogin = (req, res) => {
  res.render("login");
};

module.exports.getSignup = (req, res) => {
  res.render("signup");
};

module.exports.postSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      let saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          User.create({ username, password: hash });
        });
      });
      res.redirect("/login");
    } else {
      res.render("signup", {
        msg: "User is already present",
        username,
        password,
      });
    }
  } catch (err) {
    // res.render('error',{
    //     msg: err.message
    // })
  }
};

module.exports.getLogout = (req, res, next) =>{
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  }