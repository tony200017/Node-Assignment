const Song = require('./song.model')
//const updateAlbum = require('../album/album.service').updateAlbum;
const AlbumService = require('../album/album.service');
const CategoryService = require('../category/category.service');

const addSong = async (songData) => {
    
      const song = new Song(songData);
      await CategoryService.getCategoryById(song.categoryId);
      const album = await AlbumService.updateAlbum(song.albumId,{ lastSongAddedAt: song.createdAt });
      
      // if(!album){
      //   throw new Error("the album id you send doesn't belong to an album");
      // }
      await song.save();
      console.log('song added successfully');
      return song._id;
    
  };

const deleteSongById = async (songId)=> {
    
      // Find the song by its ID and remove it
      const deletedSong = await Song.findById(songId);
      
      if (!deletedSong) {
        throw new Error('Song not found');
      }
      await deletedSong.deleteOne();
      console.log('Song deleted successfully');
    
  }

  const hasSong = async (albumId)=> {
    
    // Find the song by its ID and remove it
    const song = await Song.findOne({ albumId: albumId });
    
    if (!song) {
     return false;
    }
    return true;
  
}


const getSongsbyAlbumId = async (param)=> {
  const albumId = param.albumId;
  const categoryId = param.categoryId;

  let query = { albumId: albumId };
        if (categoryId) {
            query.categoryId = categoryId;
        }
  await AlbumService.getAlbumById(albumId);
  const songs = await Song.find(query).sort({ createdAt: -1 });
  
  if (songs.length===0) {
   throw new Error('no songs for this album');
  }
  return songs;

}

  module.exports.addSong = addSong;
  module.exports.deleteSongById = deleteSongById;
  module.exports.getSongsbyAlbumId = getSongsbyAlbumId;

  module.exports.hasSong = hasSong;