const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const SALT_FACTOR = require('../config/keys.js').BCRYPT_SALT;

var userSchema = mongoose.Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String, required:true},
  createdAt:{type:String,default:Date.now},
  displayName: String
});

var noop = ()=>{};
userSchema.pre('save',function(done){
  var user = this;
  if(!user.isModified("password")){
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR,function(err,salt){
    if(err){return done(err);}
    bcrypt.hash(user.password,salt,noop,function(err,hashedPassword){
      if(err){return done(err);}
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.validatePassword =  function(guess,done){
  bcrypt.compare(guess,this.password,(err, isMatch)=>{
    done(err,isMatch);
  });
};

userSchema.methods.getName = ()=>{
  return  this.displayName || this.username;
};




var LocalUser = mongoose.model("LocalUser",userSchema);
module.exports = LocalUser;
