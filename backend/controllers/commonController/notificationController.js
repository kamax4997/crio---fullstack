const OneSignal = require('onesignal-node');
const cron = require('node-cron');
const winston = require('winston');
const momentTZ = require('moment-timezone');
const moment = require('moment');
const config = require('../../config/app');
const User = require('../../models/User');
const Packages = require('../../models/Packages');
const MainPackages = require('../../models/MainPackages');
const Fridges = require('../../models/Fridges');
const FridgeType = require('../../models/FridgeType');
const History = require('../../models/History');
const NotifySchedule = require('../../models/NotifySchedule');
const notificationService = require('../../service/notificationService');

 let globals = require('../Constants')
/*let globals = {
    jobs: {}
};*/

setPlayerId = async (req, res) => {
    let {uID, playerID} = req.body;
    try {
        let schedule = await NotifySchedule.findOne({uID});
        if (schedule) {
            schedule.playerID = playerID;
            schedule.save()
        }
        return res.status(200).json({
            statusCode: 200,
            data: schedule
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

// Enable/Disable Notifications
setStatus = async (req, res) => {
    let {uID, playerID, registered, status} = req.body;
    // console.log(globals)
    try {
        let schedule = await NotifySchedule.findOneAndUpdate({uID}, {
            uID, playerID, registered
        }, {upsert: true});
        if (!registered && schedule.status && globals.jobs[playerID] !== undefined) {
            globals.jobs[playerID].stop();
            schedule.status = false;
            schedule.save();
        } else if (globals.jobs[playerID] !== undefined) {
            globals.jobs[playerID].start();
            if (!schedule.status) {
                schedule.status = true;
                schedule.save();
            }
        }
        if(!status){
            schedule.status = Boolean(status);
            schedule.save();
        }
        return res.status(200).json({
            statusCode: 200,
            data: schedule
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

setSchedules = async (req, res) => {
    let {uID, notifyTime, notifyDays} = req.body;
    try {
        let oldSchedule = await NotifySchedule.findOne({uID});
        if (!oldSchedule) {
            winston.error('Not exist schedule');
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: "Not exist schedule", errorCode: 'notExistSchedule'}],
            })
        }
        let playerID = oldSchedule.playerID;
        // let playerID = '0cf092d0-ac38-4b47-a803-d520fabe152c'
        if (globals.jobs[playerID] !== undefined) {
            // console.log('destroying ====', globals.jobs[playerID])
            globals.jobs[playerID].destroy();
        }
        await notificationService.createNotification(uID, notifyTime, notifyDays, playerID);

        /*let user = await User.findOne({_id: uID});
        const notification = {
            contents: {
                'tr': 'Yeni bildirim',
                'en': 'Ciao ' + user.name + ', come stai? Hai aggiornato i frigoriferi oggi?',
            },
            include_player_ids: [playerID],
        };
        // const client = new OneSignal.Client('6c2f867d-9396-4632-98c9-bafd229880d3', 'MDY4NDY2YzItY2ZlOC00ZmMyLWExMDItZjFkYWMzYjg5MGJk');
        const client = new OneSignal.Client(config.appId, config.apiKey);
        let localTime = moment();
        let gTime = momentTZ().tz('Europe/Berlin');
        // console.log(localTime, gTime)
        let weekDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday',];
        let notifyHour = (moment(notifyTime, 'HH:mm:ss').hour() + (localTime.hour() - gTime.hour())) % 24;
        // notifyHour = -1;
        let hourMark = notifyHour;
        if (hourMark < 0) notifyHour += 24;
        let notifyMin = moment(notifyTime, 'HH:mm:ss').minute() + (localTime.minute() - gTime.minute());
        let tmp = '';
        notifyDays.forEach(item => {
            if (hourMark > 0)
                tmp += weekDays[item] + ',';
            else
                tmp += weekDays[((item - 1 + 7) % 7)] + ',';
        });
        let weekdays = tmp.slice(0, tmp.length - 1);
        let cronExpression = notifyMin + ' ' + notifyHour + ' * * ' + weekdays;
        // let cronExpression = notifyMin + ' ' + notifyHour + ' * * ' + '0-6';
        // console.log(cronExpression, notifyDays, hourMark)
        globals.jobs[playerID] = cron.schedule(cronExpression, () => {
            // console.log('stopped task', task);
            client.createNotification(notification)
                .then(response => {
                    winston.info('first notification sent!!!')
                })
                .catch(e => {
                    winston.error('first notification faild!!!', e)
                });
        }, {
            scheduled: true,
            // timezone: "Europe/Berlin"
        });
        globals.jobs[playerID].start();*/

        let scheduleModel = await NotifySchedule.findOne({uID});
        scheduleModel.playerID = playerID;
        scheduleModel.notifyTime = notifyTime;
        scheduleModel.notifyDays = notifyDays;
        scheduleModel.status = true;
        scheduleModel.save();
        /*let scheduleModel = await NotifySchedule.create({
            uID,
            playerID,
            notifyTime,
            notifyDays,
            status: true,
            registered: true,
        })*/
        return res.status(200).json({
            statusCode: 200,
            data: {
                status: 'success'
                // notifyHour, notifyMin, localTime: localTime.toString(), gTime: gTime.toString(), scheduleModel
            }
        });
    } catch (err) {
        console.log('err==> ', err)
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

getSchedule = async (req, res) => {
    let {uID} = req.body;
    try {
        let schedule = await NotifySchedule.findOne({uID});
        // console.log('schedule ==> ', uID, schedule)
        // console.log(uID, schedule)
        return res.status(200).json({
            statusCode: 200,
            data: schedule
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: "server_error", errorCode: 'serverError'}],
        })
    }
};

notifyController = async (req, res) => {
    try {
        // Notification
        const notification = {
            contents: {
                'tr': 'Yeni bildirim',
                'en': 'First!!! Hello, How are you ? I am Backend!',
            },
            // included_segments: ['Subscribed Users'],
            include_player_ids: ['0cf092d0-ac38-4b47-a803-d520fabe152c'],
        };
        const client = new OneSignal.Client('6c2f867d-9396-4632-98c9-bafd229880d3', 'MDY4NDY2YzItY2ZlOC00ZmMyLWExMDItZjFkYWMzYjg5MGJk');

        let task = cron.schedule('*/2 * * * * *', () => {
            // console.log('stopped task', task);
            client.createNotification(notification)
                .then(response => {
                    winston.info('first notification sent!!!')
                })
                .catch(e => {
                    winston.error('first notification faild!!!', e)
                });
        }, {
            scheduled: false
        });

        task.start();

        global.jobs['123456'] = task;
        // console.log('jobs ==> ', global)
        global.jobs['123456'].start();
        /*        globals.jobs['123456'].destroy()
        console.log('===========>',globals.jobs['123456'])*/
        res.json({
            data: 'success'
        })
    } catch (error) {
        winston.error(error);
        res.status(500).json({
            error: error
        })
    }
};

module.exports = {
    setPlayerId,
    getSchedule,
    setStatus,
    setSchedules,
    notifyController
};
