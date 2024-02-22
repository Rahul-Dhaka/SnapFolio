module.exports.getProfile = (req,res)=>{
    res.render('profile' , {username: req.user.username});
  }