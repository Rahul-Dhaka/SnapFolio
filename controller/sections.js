module.exports.getProfile = (req,res)=>{
  if(!req.user){
    res.redirect('/login');
  } else{
    res.render('profile' , {username: req.user.username, name: req.user.name});
    // console.log(req.user);
  }
    
    // console.log(req.user);
  }