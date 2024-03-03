const User = require('./user.model')
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const addUser = async (userData) => {
    
      userData.password = await bcrypt.hash(userData.password,12);
      userData.registrationDate = new Date();
      const user = new User(userData);
      await user.save();
      console.log('user added successfully');
      return user._id;
   
  };
 
  const login = async (loginData) => {
  email =  loginData.email
  password = loginData.password
  const user = await User.findOne({email:email});
  
  if(!user){
    throw new Error('user don\'t exist');
  }
const result = await bcrypt.compare(password,user.password);
console.log(result);
if(!result){
    throw new Error('wrong password or email');
}
const token =jwt.sign({email:user.email,userId:user._id.toString()},'randomstring',{expiresIn:'1h'})
 return {token,userId:user._id.toString()};  
 
};

  module.exports.addUser = addUser;
  module.exports.login = login;
  