const express = require("express");
const rout = new express();
const multer = require("multer");
const Photo = require("../models/photo");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dl7cia5oa",
  api_key: "721851231546765",
  api_secret: "REE9Cd_YVuFaDrQGZm--JnZfTuM",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
// const upload =
rout.use(multer({ storage }).single("image"));

rout.get("/", async (req, res) => {
  let photoes = await Photo.find();
  // console.log(photoes);
  res.render("index", {
    photoes,
  });
});

rout.post("/", (req, res) => {
  const { title, desc, tag, caption } = req.body;
  console.log(title, desc, tag, caption);
  // console.log(req.file);
  // console.log(req.user.username);
  const user = req.user._id;
  cloudinary.uploader.upload(
    `${req.file.path}`,
    { public_id: "olympic_flag" },
    async function (error, result) {
      // console.log(result.url);
      let url = result.url;
      let photo = await Photo.create({
        user,
        title,
        desc,
        tag,
        caption,
        imageUrl: url,
      });
    }
  );
  res.redirect("/home1");
  //   res.send('OK');
});

module.exports = rout;
