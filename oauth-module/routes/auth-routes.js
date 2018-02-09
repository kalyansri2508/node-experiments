const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('login.ejs',{user:req.user});
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google',{
		successRedirect: '/profile',
		failureRedirect: '/auth/login'
}));

module.exports = router;
