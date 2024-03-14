const comment = require('../models/comment');
const photo = require('../models/photo');

module.exports.getProfile = async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    let photos = await photo.find({user :req.user._id});
    // console.log(photos)
    res.render("profile", {
      username: req.user.username,
      name: req.user.name,
      age: req.user.age,
      photos,
    });
  }
};

module.exports.getHome = async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    let photoes = await photo.find({}).populate('user').sort({_id : -1});
    // console.log(photoes);
    res.render("home", {
      photoes,
    });
  }
};

module.exports.getUpload = (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("upload", { username: req.user.username, name: req.user.name });
  }
};
