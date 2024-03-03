const album = require('./album.service.js');
exports.createAlbum = async (req, res, next) => {
    
    try{
    await album.addAlbum(req.body);
    res.status(201).json({
      message: 'album created successfully!'
    });
  }catch(error){
      res.status(400).send(error);
  }
  };

  exports.updateAlbum = async (req, res, next) => {
    
    try{
    const albumId= req.params.albumId;
   const newalbum = await album.updateAlbum(albumId,req.body);
    res.status(200).json({
      message: 'album updated successfully!',
      new_album: newalbum
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };

  exports.getAlbums = async (req, res, next) => {
    
    try{
   
   const albums = await album.getAlbums();
    res.status(200).json({
      albums: albums
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };


  exports.deleteAlbum = async (req, res, next) => {
    
    try{
    const albumId= req.params.albumId;
   await album.deleteAlbum(albumId);
    res.status(200).json({
      message: 'album deleted successfully!',
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };

  exports.getAlbum = async (req, res, next) => {
    
    try{
    const albumId= req.params.albumId;
   const returnedalbum = await album.getAlbumById(albumId);
    res.status(200).json({
      album:returnedalbum
    });
  }catch(error){
      res.status(404).json({ error: error.message });
  }
  };