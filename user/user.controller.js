const user = require('./user.service.js');
exports.signUp = async (req, res, next) => {
    
    try{
       
    await user.addUser(req.body);
    res.status(201).json({
      message: 'user created successfully!'
    });
  }catch(error){
      res.status(400).send(error.message);
  }
  };


  exports.login = async (req, res, next) => {
    
    try{
       
    authObj = await user.login(req.body);
    res.status(200).json(
      authObj
    );
  }catch(error){
      res.status(400).send(error.message);
  }
  };