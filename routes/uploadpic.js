const express = require('express');
const rout = new express();
const multer  = require('multer');
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dl7cia5oa', 
    api_key: '721851231546765', 
    api_secret: 'REE9Cd_YVuFaDrQGZm--JnZfTuM' 
  });
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'images')
      },
      filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
      }
  })
  // const upload = 
  rout.use(multer({storage}).single('image'))
  
  rout.get('/uploadpic',(req,res)=>{
      res.render('index');
  })
  rout.post('/uploadpic',(req,res)=>{
      const {title,desc,tag,caption}= req.body;
      console.log(title,desc,tag,caption);
      console.log(req.file);
      cloudinary.uploader.upload(`${req.file.path}`,
    { public_id: "olympic_flag" }, 
    function(error, result) 
    {console.log(result.url); });
      res.send('OK');
  })

module.exports = rout;