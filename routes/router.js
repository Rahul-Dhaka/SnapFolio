const express = require('express');
const router = new express();
const authController = require('../controller/auth');
const exploreController = require('../controller/exploreController');
const commentController = require('../controller/commentController');
const sectionsController = require('../controller/sections');
const myPassport = require('../auth/myPassport');
const photo = require('../models/photo');
const cloudinaryUtil = require('../utils/cloudinaryUtil');
const storage = cloudinaryUtil.storage;
const multer = require('multer');

router.get('/', (req,res)=>{ res.redirect('login');});

router.post('/login', myPassport.authenticate('local', { failureRedirect: '/login' }),function (req, res) {
    res.redirect('/profile');
});

router.get('/login', authController.getLogin);
router.get('/logout', authController.getLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/profile', sectionsController.getProfile);
router.get('/home', sectionsController.getHome);
router.get('/upload', sectionsController.getUpload);
router.use(multer({ storage }).single("image"));
router.post('/upload', cloudinaryUtil.uploadPhoto);
//Added Explore Section
router.get('/explore', exploreController.getExplore);
router.post('/explore/loadmore', exploreController.loadMorePosts);


// ------------------------------------------------------ testing area below



router.post(`/test`, async (req,res)=>{
    console.log(req.body.search)
    let tag = req.body.search;
    let posts = await photo.find({tags: tag});
    console.log(posts)
    res.render('test', {posts});

});


module.exports = router;