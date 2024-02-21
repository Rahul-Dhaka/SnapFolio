const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(
    async function(username, password, done) {
      try{
        let user = await User.findOne({ username: username })
          if (!user) { return done(null, false); }
          // if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
      } catch(err) {
        return done(err);
      }
      
      }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findOne({ _id: id });
        // console.log("User", user);
        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        done(err, false);
    }
});

module.exports = passport;