const express = require('express');
const {body,param} = require('express-validator');

const songController = require('./song.controller');
const songApiValidation = require('./song.validation');
const isAuth = require('../Middleware/Auth');

const router = express.Router();

// router.post('/add-song',
// [
//     body('name').trim().isLength({min:2}).isString().notEmpty(),
//     body('singer').trim().isLength({min:2}).isString().notEmpty(),
//     body('albumId').notEmpty().isMongoId(),
//     body('categoryId').notEmpty().isMongoId(),
// ], songController.createSong);
router.post('/add-song', songApiValidation.addSongApiValidation, songController.createSong);

//router.delete('/delete-song/:songId',[param('songId').notEmpty().isMongoId()] ,songController.deleteSong);
router.delete('/delete-song/:songId',songApiValidation.deleteSongApiValidation ,songController.deleteSong);


router.get('/songsofalbum/:albumId/:categoryId?',isAuth,songController.getSongsbyAlbumId);

module.exports = router;