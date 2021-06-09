const mongoose = require('mongoose');

const COLLECTION = 'emailtemplate';

const emailSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    code: {type: String, default: ''},
    subject: {type: String, default: ''},
    status: {type: Boolean, default: true},
    // user who has a subscription
    active: {type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model(COLLECTION, emailSchema);
