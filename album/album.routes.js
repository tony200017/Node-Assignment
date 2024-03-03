
const express = require('express');

const albumController = require('./album.controller');
const router = express.Router();

router.post('/add-album', albumController.createAlbum);
router.patch('/update-album/:albumId', albumController.updateAlbum);
router.get('/get-album/:albumId', albumController.getAlbum);
router.get('/all-album', albumController.getAlbums);
router.delete('/delete-album/:albumId', albumController.deleteAlbum);

module.exports = router;