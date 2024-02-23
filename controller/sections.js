module.exports.getProfile = (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("profile", { username: req.user.username, name: req.user.name, age:req.user.age });
  }
};

module.exports.getHome = (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("home", { username: req.user.username, name: req.user.name });
  }
};

module.exports.getUpload = (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("upload", { username: req.user.username, name: req.user.name });
  }
};