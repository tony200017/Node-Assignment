const mongoose = require('mongoose');
const config = require('../config.js');


const albumSchema = new mongoose.Schema({
    name:  String,
    description: String,
    showNbTracks: { type: Boolean, default: false },
    lastSongAddedAt:Date,
    createdByRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedByRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }, { timestamps: true });

  albumSchema.index({createdByRef:1});
  albumSchema.index({updatedByRef:1});
  
  const Album = mongoose.model(config.tableNames.album, albumSchema);
  
  module.exports = Album;