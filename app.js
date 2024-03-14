const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const hbs = require("hbs");
const app = new express();
const myPassport = require('./auth/myPassport')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 4444;
// const { isLoggedIn } = require('./middleware/auth'); // Adjust the path accordingly
const photoController = require('./controller/photoController');
const commentController = require('./controller/commentController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname,'views/partials'));
app.use(session({
  secret: 'kitkat',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_PATH })
}));
app.use(myPassport.initialize());
app.use(myPassport.session());

app.use(express.static(path.join(__dirname, 'public')));
const router = require('./routes/router');
app.use('/', router);

// const isLoggedIn = require('./middleware/isLoggedIn')
// app.use('/uploadpic', require('./routes/uploadpic'));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  // console.log(req.user)
  next();
});

// Routes for photo-related functionalities
// app.get('/photos/:photoId', photoController.getPhotoDetails);
//router me add karna hai
app.get('/photo/:photoId', photoController.getPhotoDetails);
app.post('/updatePhoto/:photoId', photoController.updatePhotoCaption);
app.get('/deletePhoto/:photoId', photoController.deletePhoto);
app.get('/comment/:photoId', commentController.getCommentDetails);
app.post('/comment/:photoId', commentController.postCommentDetails);

app.post('/api/photos/:photoId/like', photoController.likePhoto);
app.post('/api/photos/:photoId/unlike', photoController.unlikePhoto);

mongoose.connect(process.env.DB_PATH)
  .then(() => {
    console.log("Database server live->");
    app.listen(PORT, () => {
      console.log("App server running at http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database Server");
  });
