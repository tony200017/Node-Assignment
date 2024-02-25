const Song = require('../Song/song.model')
const Album = require('../Albums/album.model')

const addSong = async (songData) => {
    try {
      //const { name, singer, categoryId, albumId } = songData;
      //const song = new Song({ name, singer, category: categoryId, album: albumId });
      const song = new Song(songData);

      await song.save();

      await Album.findByIdAndUpdate(song.album, { lastSongAddedAt: song.createdAt });

      console.log('song added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

const deleteSongById = async (songId)=> {
    try {
      // Find the song by its ID and remove it
      const deletedSong = await Song.findById(songId);
      
      if (!deletedSong) {
        throw new Error('Song not found');
      }
      await deletedSong.deleteOne();
      console.log('Song deleted successfully');
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  }

//extra functions
  const getSongIdByName = async (songName) => {
    try {
      // Query the database for the song with the given name
      const song = await Song.findOne({ name: songName });
  
      // If the song exists, return its ID
      if (song) {
        return song._id;
      } else {
        console.error('song not found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving song ID:', error);
      return null;
    }
  };


  module.exports.addSong = addSong;
  module.exports.deleteSongById = deleteSongById;

  module.exports.getSongIdByName = getSongIdByName;