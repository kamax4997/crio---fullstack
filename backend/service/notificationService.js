const moment = require('moment');
const winston = require('winston');
const User = require('../models/User');
const NotifySchedule = require('../models/NotifySchedule');
const config = require('../config/app');
const OneSignal = require('onesignal-node');
const cron = require('node-cron');

createNotification = async (uID, notifyTime, notifyDays, playerID) => {
    try {
        let user = await User.findOne({_id: uID});
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
        let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',];
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
        globals.jobs[playerID].start();
    } catch (e) {

    }
};

restartNotification = async () => {
    let schedules = await NotifySchedule.find({});
    for (let schedule of schedules) {
        // console.log('schedule ===> ', schedule)
        if (schedule.playerID) {
            try {
                await createNotification(schedule.uID, schedule.notifyTime, schedule.notifyDays, schedule.playerID);
            }catch (err) {
                console.log('skip!')
            }
        }
    }
    return true;
};

module.exports = {
    createNotification,
    restartNotification,
};
