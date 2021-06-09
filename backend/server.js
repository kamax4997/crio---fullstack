const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const config = require('./config/app.js');
const compression = require('compression');
const errorHandler = require('express-json-errors');
const middlewareErrorParser = require('./middleware/ErrorParser');
const middlewarePathLogger = require('./middleware/PathLogger');
const path = require('path');
const winston = require('winston');
const fileUpload = require('express-fileupload');
const database = require('./database/index')
const routes = require('./routes');
const OneSignal = require('onesignal-node');
const cron = require('node-cron');
const paypal = require('paypal-rest-sdk');
const notificationService = require('./service/notificationService');

// global.aaa = 12;
global.globals = {
    jobs: {
        // id: 0
    }
};
// let aaa = 12;

/*const CLIENT = 'AQ4cbpmlGDKNz3iDpDvFAoiGFhfS73UZJiHBjRBRZ1FLQblD1fBv6R4HYjjjXdrVj-ka39NUXkTUQAvV';
const SECRET = 'EBQysA-YzNPRGc4NTFLNXqlEU0LslegxYZk8PrjbLRSFSWCxgizKYjqudOQ8nBmb3N16c08mK9FwVC2h';
const PAYPAL_API = 'https://api.sandbox.paypal.com';*/
const CLIENT = config.paypalDevClient;
const SECRET = config.paypalDevSecret;
const PAYPAL_API = config.paypalDevApi;

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': CLIENT,
    'client_secret': SECRET
});

const app = express();

app.use(express.json({type: "application/json"}));
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    createParentPath: true
}));

// var whitelist = ['https://apps.crioon.com/', 'http://localhost:8080']; //white list consumers
var whitelist = ['https://apps.crioon.com/'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
};
// add cors headers
app.use(cors(corsOptions));
// comporess output
app.use(compression());

// only on debug mode
if (config.debug) {
    // path logger
    app.use(middlewarePathLogger);
}

// use routes
app.use('/api/', routes);

// app.use(express.static(path.join(__dirname, '../client/dist')));

///////////////////////////////////////////////////
// For Heroku deployment
/*app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
});*/

// Error Parser Middleware
app.use(middlewareErrorParser);

//Init MongoDB
function startDB() {
    database.init(function (err, db) {
        if (err) {
            winston.error('FETAL: ' + err.message);
            winston.warn('Retrying to connect to MongoDB in 10secs...');
            return setTimeout(function () {
                // database.init();
            }, 10000);
        } else {
            winston.info('MongoDB connected ...');
            // dbCallback(err, db);
            notificationService.restartNotification().then(res => {
                console.log('restart notification success ==> ', res);
            }).catch(err => {
                console.log('restart notification error ==> ', err)
            })
        }
    });
}

startDB();

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log('Express server listening on %d, in %s mode', PORT, app.get('env'));
});

// Expose app
module.exports = app;
