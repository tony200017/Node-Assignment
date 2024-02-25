const mongoose = require('mongoose');
const Song = require('../Song/song.model');


const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    showNbTracks: { type: Boolean, default: false },
    lastSongAddedAt: { type: Date, default: null },
  }, { timestamps: true });

// Define a pre hook to remove songs associated with the album before it's removed
albumSchema.pre('deleteOne', async function(next) {
    try {
      // Find all songs associated with the album and remove them
      console.log("Deleting album with _id:", this._conditions._id);
      const result = await Song.deleteMany({ album: this._conditions._id });
      console.log(`${result.deletedCount} songs associated with the album deleted successfully.`);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  const Album = mongoose.model('Album', albumSchema);
  
  module.exports = Album;