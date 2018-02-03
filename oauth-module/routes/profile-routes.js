const router = require('express').Router();

const checkRoutes = (req,res,next)=>{
  if(!req.user){
      res.render('login.ejs');
  }else{
      next();
  }
};

router.get('/',checkRoutes,(req,res)=>{
    res.render('profile.ejs',{userID:req.user});
});

module.exports = router;
