const dbconnection = require('./config.js');
const category = require('./Category/category.service.js');
const album = require('./Albums/album.service.js');
const song = require('./Song/song.service.js');

const mongoose = require('mongoose');
const Album = require('./Albums/album.model.js');


async function connectToDatabase() {
    try {
      await mongoose.connect(dbconnection.mongodbConnection);
      console.log('Connected Successfully');
    } catch (err) {
      console.error(err);
    }
  }
  
 
  
 
 
async function testCase() {
  try {

     await connectToDatabase();
     await category.addCategory({name:'Pop' ,description:'description1'});
     await category.addCategory({name:'Jazz' ,description:'description2'});

     

     await album.addAlbum({name:'My Album', description:'description', showNbTracks:true});
     await album.addAlbum({name:'Temp Album', description:'description'});
     await album.getAlbums();
     
    //get id of the album and the category
     const myAlbumId=await album.getAlbumIdByName('My Album');
    const tempAlbumId=await album.getAlbumIdByName('Temp Album');
    const popCategoryId=await category.getCategoryIdByName("Pop");
    const jazzCategoryId=await category.getCategoryIdByName("Jazz");

    //add the songs the album will update the lastSongAddedAt field by itself
       await song.addSong({name:'song1', singer:'john',category: popCategoryId,album:myAlbumId});
       await song.addSong({name:'song2', singer:'john',category: popCategoryId,album:myAlbumId});
       await song.addSong({name:'song3', singer:'john',category: popCategoryId,album:myAlbumId});

       await song.addSong({name:'song4', singer:'john',category: jazzCategoryId,album:tempAlbumId});
       await song.addSong({name:'song5', singer:'john',category: jazzCategoryId,album:tempAlbumId});
       await song.addSong({name:'song6', singer:'john',category: jazzCategoryId,album:tempAlbumId});
    //delete the latest song of my album
     const latestsongId = await song.getSongIdByName("song3");
     await song.deleteSongById(latestsongId);
    // await album.deleteLatestSongWithAlbumId(myAlbumId);
    //all the song of the album will be deleted
    await album.deleteAlbum(tempAlbumId);
    await album.updateAlbum(myAlbumId,{description:'updated description'});
    await album.getAlbums();



  } catch (error) {
    console.error('Error:', error);
  }
}


  


testCase();

