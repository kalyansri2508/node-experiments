const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const keys = require('./keys.js');
var User = require('../models/user.js');
passport.serializeUser((user,done)=>{
  done(null,user._id);
});

passport.deserializeUser((Id,done)=>{
  User.findById(Id, (err,user)=>{
    done(null,user);
  });
});

passport.use(new GoogleStrategy({
    clientID:     keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect",
    passReqToCallback   : true
  },(request, accessToken, refreshToken, profile, done) => {
      User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
          done(null,currentUser);
        }else{
          new User({googleId:profile.id,displayName:profile.displayName}).save().then((newUser)=>{
            done(null,newUser);
          });
        }
      });
  }
));
