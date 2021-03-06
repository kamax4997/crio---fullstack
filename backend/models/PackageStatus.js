const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const winston = require('winston');

const COLLECTION = 'fridgeStatus';
const SALT_ROUND = 10;

// How many fridges the user created under certain Package
const packageStatusSchema = mongoose.Schema({
    uID: {type: String, required: true},
    pID: {type: String, required: true},
    count: {type: Number, default: 0},
    // date: {type: Date, default: Date.now()},
    // status: {type: Number, default: 0},
}, { timestamps: true });

module.exports = mongoose.model(COLLECTION, packageStatusSchema);
