const express = require('express');
const router = new express();
const authController = require('../controller/auth');
const sectionsController = require('../controller/sections');
const myPassport = require('../auth/myPassport')

router.get('/', (req,res)=>{
    res.render('index');
})

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

module.exports = router;