const photo = require('../models/photo');

module.exports.getExplore = async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    // Using query parameter to determine the number of posts to load
    const limit = parseInt(req.query.limit) || 8;

    let photos = await photo.find().populate('user').limit(limit);
    const shuffledPhotos = photos.sort(() => Math.random() - 0.5);

    res.render("explore", {
      shuffledPhotos,
    });
  }
};
//Load more Section
module.exports.loadMorePosts = async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    const skip = parseInt(req.body.skip) || 0; // Number of posts to skip
    const limit = 2; // Number of posts to load per request

    try {
      let photos = await photo.find().populate('user').skip(skip).limit(limit);
      const shuffledPhotos = photos.sort(() => Math.random() - 0.5);

      res.json({
        shuffledPhotos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};