const express = require('express');
const router = new express();
const loginController = require('../controller/login')
const signupController = require('../controller/signup');
const myPassport = require('../auth/myPassport')

router.get('/', (req,res)=>{
    res.render('index');
})
router.get('/login', loginController.getLogin);
router.post('/login', myPassport.authenticate('local', { failureRedirect: '/login' }),
function (req, res) {
    res.redirect('/profile');
});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

router.get('/signup', signupController.getSignup);
router.post('/signup', signupController.postSignup);
router.get('/profile', (req,res)=>{
    res.render('profile' , {username: req.user.username});
  })

module.exports = router;