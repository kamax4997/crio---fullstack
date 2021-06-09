const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const winston = require('winston');
const randomstring = require('randomstring');
const User = require('../models/User');
const Fridges = require('../models/Fridges');
const Packages = require('../models/Packages');
const MainPackages = require('../models/MainPackages');
const History = require('../models/History');
const FridgeStatus = require('../models/FridgeStatus');
const FridgeType = require('../models/FridgeType');
const config = require('../config/app');

// Get Fridges By User ID, not expired ( end date > today )
getAllFridges = async (uID) => {
    // let {uID} = req.body;
    try {
        let curDate = Date.now();
        let packages = await Packages.find({uID: uID, endDate: {$gt: curDate}});
        let allFridges = [];
        for (const pkg of packages) {
            let fridges = await Fridges.find({uID: uID, pID: pkg._id});
            allFridges.push(...fridges);
        }
        // Get Status for today
        const today = moment().startOf('day');
        let tmpFridges = [];
        for (const fridge of allFridges) {
            let history = await History.findOne({
                uID,
                fID: fridge._id,
                date: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                }
            });
            let fType = await FridgeType.findOne({_id: fridge.type});
            // console.log(fridge)
            let tmpFridge = fridge._doc;
            tmpFridge.status = history.status;
            // tmpFridge.type = fType.title;
            tmpFridge.typeTitle = fType.title;
            tmpFridges.push(tmpFridge);
            // console.log(tmpFridges)
        }
        /*return res.status(200).json({
            statusCode: 200,
            data: tmpFridges,
        });*/
        return tmpFridges;
    } catch (err) {
        return null;
        /*res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })*/
    }
};

updateAllHistory = async (curPackage, maintenanceDay, updatedFridge) => {
    let curDate = moment();
    let endDate = curPackage.endDate;
    //check whether is the maintenance day, if yes start the day with that status

    for (let m = moment(curDate); m.isBefore(endDate); m.add(1, 'days')) {
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // moment().day(): Sunday as 0, Saturday as 6 <> maintenanceDay => Sunday as 6, monday as 0
        let status = maintenanceDay.includes((m.day() - 1) % 7) ? 1 : 0; // if cleaning day, set 1, else set 0
        let history = await History.findOneAndUpdate({
                fID: updatedFridge._id,
                date: {
                    $gte: m.startOf('day').toDate(),
                    $lte: m.endOf('day').toDate()
                },
            }, {
                status
            },
            {
                upsert: true,
            });
    }
};

initAllHistory = async (curPackage, maintenanceDay, updatedFridge, uID) => {
    let curDate = moment();
    let endDate = curPackage.endDate;
    //check whether is the maintenance day, if yes start the day with that status

    for (let m = moment(curDate); m.isBefore(endDate); m.add(1, 'days')) {
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // moment().day(): Sunday as 0, Saturday as 6 <> maintenanceDay => Sunday as 6, monday as 0
        let status = maintenanceDay.includes((m.day() - 1) % 7) ? 1 : 0; // if cleaning day, set 1, else set 0
        let history = await History.findOneAndUpdate({
                fID: updatedFridge._id,
                date: {
                    $gte: m.startOf('day').toDate(),
                    $lte: m.endOf('day').toDate()
                },
            }, {
                uID,
                fID: updatedFridge._id,
                date: m,
                status
            },
            {
                upsert: true,
            });
    }
};

renewAllFridges = async (uID, endDate) => {
    let bulk = await Packages.collection.initializeOrderedBulkOp();
    await bulk.find({uID}).update({$set: {endDate}});
    await bulk.execute();

    let bulk2 = await Fridges.collection.initializeOrderedBulkOp();
    await bulk2.find({uID}).update({$set: {active: false}});
    await bulk2.execute();

    //create history
    let fridges = await Fridges.find({uID});
    fridges.map(async (fridge) => {
        let curPackage = await Packages.findOne({_id: fridge.pID});
        let maintenanceDay = fridge.maintenanceDay;
        await initAllHistory(curPackage, maintenanceDay, fridge, uID);
    })

};

module.exports = {
    getAllFridges,
    updateAllHistory,
    renewAllFridges,
};
