const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    singer: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  }, { timestamps: true });
  
 


  const Song = mongoose.model('Song', songSchema);
  
  module.exports = Song;