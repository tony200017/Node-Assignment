
const express = require('express');

const categoryController = require('./category.controller');
const router = express.Router();

router.post('/add-category', categoryController.createCategory);
module.exports = router;