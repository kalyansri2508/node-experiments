const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  googleId:{type:String,required:true},
  createdAt:{type:String,default:Date.now},
  displayName: String
});

userSchema.methods.getName = ()=>{
  return  this.displayName;
};

var User = mongoose.model("User",userSchema);
module.exports = User;
