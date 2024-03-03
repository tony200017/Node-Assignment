///
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

//get different routes
const categoryRoutes = require('./category/category.routes.js');
const albumRoutes = require('./album/album.routes.js');
const songRoutes = require('./song/song.routes.js');
const userRoutes = require('./user/user.routes.js');
//get the connection string
const dbconnection = require('./config.js');

//get service for test function
const category = require('./category/category.service.js');
const album = require('./album/album.service.js');
const song = require('./song/song.service.js');

const app =express();


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
     const popCategoryId = await category.addCategory({name:'Pop' ,description:'description1'});
     const jazzCategoryId=await category.addCategory({name:'Jazz' ,description:'description2'});

     

     const myAlbumId = await album.addAlbum({name:'My Album', description:'description', showNbTracks:true});
     const tempAlbumId =await album.addAlbum({name:'Temp Album', description:'description'});
    // console.log(await album.getAlbums());
     
    

    //add the songs the album will update the lastSongAddedAt field by itself
      // await song.addSong({name:'song1', singer:'john',categoryId: popCategoryId,albumId:myAlbumId});
      // await song.addSong({name:'song2', singer:'john',categoryId: popCategoryId,albumId:myAlbumId});
      // const latestsongId =  await song.addSong({name:'song3', singer:'john',categoryId: popCategoryId,albumId:myAlbumId});

       await song.addSong({name:'song4', singer:'john',categoryId: jazzCategoryId,albumId:tempAlbumId});
       await song.addSong({name:'song5', singer:'john',categoryId: jazzCategoryId,albumId:tempAlbumId});
       await song.addSong({name:'song6', singer:'john',categoryId: jazzCategoryId,albumId:tempAlbumId});
    //delete the latest song of my album
    // await song.deleteSongById(latestsongId);
    //delete album
    //await album.deleteAlbum(tempAlbumId);
   // console.log(await album.getAlbums());




  } catch (error) {
    console.error('Error:', error);
  }
}


  


//testCase();
connectToDatabase();
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/categories',categoryRoutes);
app.use('/albums',albumRoutes);
app.use('/songs',songRoutes);
app.use('/users',userRoutes);


app.listen(3000,()=>{console.log("server started")});