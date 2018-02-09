const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');

app.set('view engine', 'ejs');
app.use('/public',express.static('./public'));

const keys = require('./config/keys.js');
app.use(cookieSession({
  name: 'session',
  keys: [keys.MY_SECRET],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
const passportConfig = require('./config/passport-config.js');

const authRoutes = require('./routes/auth-routes');
app.use('/auth',authRoutes);
const profileRoutes = require('./routes/profile-routes');
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{
  res.render('home.ejs',{user:req.user});
});

const port = require('./config/server-config.js').port;
app.listen(port,()=>{
  console.log("listening on port :"+port);
});
