
const multer = require("multer");
const Photo = require("../models/photo");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    },
  });

module.exports.uploadPhoto = (req, res) => {
  const { title, tags, caption } = req.body;


  
  const user = req.user._id;
  cloudinary.uploader.upload(
    `${req.file.path}`,
    // { public_id: "olympic_flag" }
    {
      use_filename: true, 
      unique_filename: false
    },
    async function (error, result) {
        // console.log(req.file.path);
      let url = result.url;
      let photo = await Photo.create({
        user,
        title,
        tags,
        caption,
        imageUrl: url,
      });
    }
  );
  res.redirect("/upload");
  //   res.send('OK');
};
