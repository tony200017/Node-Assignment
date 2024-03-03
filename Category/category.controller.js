const category = require('./category.service.js');
exports.createCategory = async (req, res, next) => {
    
    try{
    await category.addCategory(req.body);
    res.status(201).json({
      message: 'category created successfully!'
    });
  }catch(error){
      res.status(400).send(error);
  }
  };