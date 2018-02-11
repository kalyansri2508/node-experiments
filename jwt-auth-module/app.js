const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport-config.js');

const keys = require('./config/keys.js');
const authRoutes = require('./routes/auth-routes.js');
var LocalUser = require('./models/user.js');

const app = express();
mongoose.connect(keys.MONGO_DB_URL);



LocalUser.findOne({username:'test'}).then((currentUser)=>{
  if(currentUser){
//    console.log(currentUser);
  }else{
    new LocalUser({username:'test',displayName:'test',password:'test@123'}).save().then((newUser)=>{
      console.log("Created new user : "+newUser);
    });
  }
});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public',express.static('./public'));
app.use(passport.initialize());
app.use('/auth',authRoutes);


app.get('/',(req,res)=>{
  res.render('home.ejs',{user:req.user});
});


app.listen(3000,()=>{
   console.log("Server started on the port  3000 ");
})
