const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const LocalUser = require('../models/user.js');


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log("reached here in the call back");
    LocalUser.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.validatePassword(password,(err,isMatch)=>{
          if (err) { return done(err); }
          if(isMatch){
            return done(null,user);
          }else{
            return done(null, false, { message: 'Invalid password'});
          }
      });
    });
  }
));

//module.exports = passport;
