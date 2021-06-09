const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const winston = require('winston');
const moment = require('moment');
const randomstring = require('randomstring');
const User = require('../../models/User');
const Fridges = require('../../models/Fridges');
const FridgeStatus = require('../../models/FridgeStatus');
const Packages = require('../../models/Packages');
const MainPackages = require('../../models/MainPackages');
const History = require('../../models/History');
const PurchaseHistory = require('../../models/PurchaseHistory');
const config = require('../../config/app');
const packageService = require('../../service/packageService');

// Get All Packages
getMainPackages = async (req, res) => {
    let {uID} = req.body;
    try {
        let packages = await MainPackages.find({});
        let curPackage = await Packages.findOne({uID, status: true});
        let trialPackage = await Packages.findOne({uID, type: 'trial'});
        let today = moment();
        // let trialFinished = !trialPackage ? false : (trialPackage.endDate < today.toDate());
        let trialFinished = !trialPackage ? false : trialPackage.finished;
        return res.status(200).json({
            statusCode: 200,
            data: {packages, curPackage, trialFinished},
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

getMainPackageByID = async (req, res) => {
    let {pID} = req.body;
    try {
        let curPackage = await MainPackages.findOne({_id: pID});
        return res.status(200).json({
            statusCode: 200,
            data: curPackage
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

module.exports = {
    getMainPackages,
    getMainPackageByID
};
