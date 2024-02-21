const myPassport= require('../auth/myPassport')

module.exports.getLogin = (req,res)=>{
    res.render('login');
}

// module.exports.postLogin = 
    