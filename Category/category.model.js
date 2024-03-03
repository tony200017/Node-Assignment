const mongoose = require('mongoose');
const config = require('../config.js');


const Schema = mongoose.Schema;
const categorySchema = Schema({
    name:String, 
    description:String,
    createdByRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedByRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}}, 
    { timestamps: true });

    categorySchema.index({createdByRef:1});
    categorySchema.index({updatedByRef:1});


module.exports = mongoose.model(config.tableNames.category,categorySchema);