const Joi = require('joi');

const addSongSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  singer: Joi.string().trim().min(2).required(),
  albumId: Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/),
  categoryId: Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/),
});

const deleteSongParamsSchema = Joi.object({
  songId: Joi.string().trim().required().regex(/^[0-9a-fA-F]{24}$/),
});

const deleteSongApiValidation =  (req, res, next) => {
  const { error } = deleteSongParamsSchema.validate({ songId: req.params.songId });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

const addSongApiValidation =  (req, res, next) => {
    const { error } = addSongSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }

module.exports.addSongApiValidation = addSongApiValidation;
module.exports.deleteSongApiValidation = deleteSongApiValidation;