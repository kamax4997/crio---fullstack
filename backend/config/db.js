require('dotenv').config();
let env = process.env.NODE_ENV || 'development';

const mongoURI = process.env.MONGODB_URI;
module.exports = {mongoURI};
