const Album = require('./album.model');
const SongService = require('../song/song.service');
const { Error } = require('mongoose');

//create
const addAlbum = async (albumData) => {
   
      const album = new Album(albumData);
      await album.save();
      console.log('Album added successfully');
      return album._id; 
   
  };
//update
const updateAlbum= async  (albumId, updatedFields) => {
  
      // Find the album by its ID and update it
      const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedFields, { new: true });
  
      if (!updatedAlbum) {
        throw new Error('Album not found');
      }
  
      console.log('Album updated successfully:');
      return updatedAlbum;
   
  }

  
//read
const getAlbums = async  ()=> {
  
    const albums = await Album.find();
    return albums;
}


  //delete
  const deleteAlbum = async (albumId)=> {
   
      // Find the album by its ID
      const album = await Album.findById(albumId);
  
      if (!album) {
        throw new Error('Album not found');
      }
     const hasRelatedSons = await SongService.hasSong(albumId);
     
      if(hasRelatedSons){
        throw new Error('the album is related to a song');
      }

      
  
      
      await album.deleteOne();
  
      console.log('Album deleted successfully');
    
  }
  
  const getAlbumById = async (albumId) => {
   
      const album = await Album.findById(albumId);
      if (album) {
        return album;
      } else {
       throw new Error('album not found');
      }
    
  };
  


  module.exports.updateAlbum = updateAlbum;
  module.exports.addAlbum = addAlbum;
  module.exports.getAlbums = getAlbums;
  module.exports.getAlbumById = getAlbumById;
  module.exports.deleteAlbum = deleteAlbum;