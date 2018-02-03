const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const keys = require('./keys.js');

passport.serializeUser((userId,done)=>{
  done(null,userId);
});

passport.deserializeUser((userId,done)=>{
  done(null,userId);
});

passport.use(new GoogleStrategy({
    clientID:     keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect",
    passReqToCallback   : true
  },(request, accessToken, refreshToken, profile, done) => {
  //    console.log(profile);
      var userID = profile.id;
      done(null,userID);
  }
));
