const mongoose = require('mongoose');
const config = require('../config.js');

const songSchema = new mongoose.Schema({
    name:  String,
    singer:  String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
  }, { timestamps: true });
  
 songSchema.index({categoryId:1});
 songSchema.index({albumId:1});


  const Song = mongoose.model(config.tableNames.song, songSchema);
  
  module.exports = Song;