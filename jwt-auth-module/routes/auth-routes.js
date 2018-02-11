const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');

var generateToken = (req,res,next)=>{
  console.log("Generating Token");
  req.token = jwt.sign(
    {id:req.user.id},keys.JWT_SECRET,{
    expiresIn: 120*60
  });
  next();
};

var respond = (req,res)=>{
  console.log(jwt.decode(req.token,keys.JWT_SECRET));
  res.status(200).json({user:req.user.username,token:req.token});
};

var deserializeUser = (Id,done)=>{
  LocaclUser.findById(Id, (err,user)=>{
    done(null,user);
  });
};


router.get('/login',(req,res)=>{
    res.render('login.ejs',{user:req.user});
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

router.post('/local',passport.authenticate('local',{
    session: false
  }),generateToken,respond);

module.exports = router;
