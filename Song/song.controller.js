const song = require('./song.service.js');
const {validationResult} = require('express-validator');


exports.createSong = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //
    return  res.status(422).json({
            message: 'validation error',
            error:errors
          });  
    }
    try{
        
    await song.addSong(req.body);
    res.status(201).json({
      message: 'song created successfully!'
    });
  }catch(error){
      res.status(400).send(error.message);
  }
  };

  exports.deleteSong = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //
    return  res.status(422).json({
            message: 'validation error',
            error:errors
          });  
    }
    try{
    const songId= req.params.songId;
   await song.deleteSongById(songId);
    res.status(200).json({
      message: 'song deleted successfully!',
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };



  exports.getSongsbyAlbumId = async (req, res, next) => {
   
    try{
     
  songs = await song.getSongsbyAlbumId(req.params);
    res.status(200).json({
      songs
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };