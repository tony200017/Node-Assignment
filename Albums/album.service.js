const Album = require('../Albums/album.model');
const Song = require('../Song/song.model');

//create
const addAlbum = async (albumData) => {
    try {
      const album = new Album(albumData);
      await album.save();
      console.log('Album added successfully');
    } catch (error) {
      console.error('Error adding Album:', error);
    }
  };
//update
const updateAlbum= async  (albumId, updatedFields) => {
    try {
      // Find the album by its ID and update it
      const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedFields, { new: true });
  
      if (!updatedAlbum) {
        throw new Error('Album not found');
      }
  
      console.log('Album updated successfully:', updatedAlbum);
      return updatedAlbum;
    } catch (error) {
      console.error('Error updating album:', error);
      return null;
    }
  }

  
//read
const getAlbums = async  ()=> {
  try {
    const albums = await Album.find();
return albums;}catch (error) {
  console.error('Error fetching albums :', error);
}
}


  //delete
  const deleteAlbum = async (albumId)=> {
    try {
      // Find the album by its ID
      const album = await Album.findById(albumId);
  
      if (!album) {
        throw new Error('Album not found');
      }
  
      // Delete all songs associated with the album
      //await Song.deleteMany({ album: album._id });
  
      // Remove the album
      await album.deleteOne();
  
      console.log('Album and associated songs deleted successfully');
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  }
  
  const getAlbumById = async (albumId) => {
    try {
      // Query the database for the album with the given name
      const album = await Album.findById(albumId);
  
      // If the album exists, return its ID
      if (album) {
        return album;
      } else {
        console.error('Album not found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving album :', error);
      return null;
    }
  };
  
//extra function
//delete latest song
const deleteLatestSongWithAlbumId = async (albumId)=>{
  try {
    // Find the latest song associated with the given album ID
    const latestSong = await Song.findOne({ album: albumId }).sort({ createdAt: -1 });

    if (!latestSong) {
      throw new Error('No songs found for the given album ID');
    }

    // Delete the latest song
    await latestSong.deleteOne();

    console.log('Latest song deleted successfully');
  } catch (error) {
    console.error('Error deleting latest song:', error);
  }
}

const getAlbumIdByName = async (albumName) => {
  try {
    // Query the database for the album with the given name
    const album = await Album.findOne({ name: albumName });

    // If the album exists, return its ID
    if (album) {
      return album._id;
    } else {
      console.error('Album not found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving album ID:', error);
    return null;
  }
};

  module.exports.updateAlbum = updateAlbum;
  module.exports.addAlbum = addAlbum;
  module.exports.getAlbums = getAlbums;
  module.exports.getAlbumById = getAlbumById;
  module.exports.deleteAlbum = deleteAlbum;


  module.exports.getAlbumIdByName = getAlbumIdByName;
  module.exports.deleteLatestSongWithAlbumId = deleteLatestSongWithAlbumId;