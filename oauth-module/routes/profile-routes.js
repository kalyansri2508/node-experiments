const router = require('express').Router();


router.get('/',(req,res)=>{
    res.render('profile.ejs',{userID:req.user});
});

module.exports = router;
