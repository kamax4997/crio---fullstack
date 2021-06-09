const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const winston = require('winston');

const COLLECTION = 'fridges';
const SALT_ROUND = 10;

// Fridges that users have created under their package purchased
const fridgeSchema = mongoose.Schema({
    uID: {type: String, required: true},
    pID: {type: String, required: true}, //package id
    name: {type: String, default: ''},
    type: {type: String, default: ''},
    maintenanceDay: {type: Array, default: []},
    note: {type: String, default: ''},
    // Enable/disable
    active: {type: Boolean, default: true},
    company: {type: String, default: ''},
    city: {type: String, default: ''},
    country: {type: String, default: ''},
    postalCode: {type: String, default: ''},
    password: {type: String, default: ''},
    lastUpdate: {type: Date, default: Date.now()}, // last date for updating history
    lastHistory: {type: Number, default: 0}, // last state for updating history
}, { timestamps: true });

module.exports = mongoose.model(COLLECTION, fridgeSchema);
