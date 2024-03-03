const mongoose = require('mongoose');
const config = require('../config.js');
const userSchema = new mongoose.Schema({
    name:  String,
    email:  String,
    password: String,
    registrationDate: Date,
    dateOfBirth:Date,
    location:{longitude:String,latitude:String}

  }, { timestamps: true });
  
 


  const User = mongoose.model(config.tableNames.user, userSchema);
  
  module.exports = User;