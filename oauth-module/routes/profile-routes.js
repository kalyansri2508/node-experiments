const router = require('express').Router();

const checkRoutes = (req,res,next)=>{
  if(!req.user){
      res.render('login.ejs',{user:req.user});
  }else{
      next();
  }
};

router.get('/',checkRoutes,(req,res)=>{
    res.render('profile.ejs',{user:req.user});
});

module.exports = router;
