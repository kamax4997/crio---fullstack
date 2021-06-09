const randomstring = require("randomstring");
const { sendEmail } = require('./mailService');
const config = require('../config/app');
const EmailTemplate = require('../models/EmailTemplate');
var DOMParser = require('dom-parser');

sendEmailVerification = async (name1, email, template, hostname) => {
    try {
        let a = template === 'token' ? await EmailTemplate.find({ name: 'emailtoken' }) :
            template === 'register' ? await EmailTemplate.find({ name: 'welcomeEmail' }) :
                template === 'resetPassword' ? await EmailTemplate.find({ name: 'resetPassword' }) :
                    template === 'forgotPassword' ? await EmailTemplate.find({ name: 'forgotPassword' }) :
                        await EmailTemplate.find({ name: 'genericTemplate' })

        let asd = new DOMParser().parseFromString(a[0].code, "text/xml");
        const emailToken = randomstring.generate(5);
        const newPassword = randomstring.generate(10);
        htmlData = asd.rawHTML.replace("{website_name}", "crioon");
        htmlData = htmlData.replace("{{name}}", name1);
        htmlData = htmlData.replace("{{emailToken}}", emailToken);
        htmlData = htmlData.replace(/https:\/\/newPassword_URL/g, hostname);
        htmlData = htmlData.replace(/newPassword_Link/g, hostname);
        subName = a[0].subject.replace("{{name}}", name1);
        const msg = {
            to: email,
            from: config.mailUsername,
            subject: subName,
            text: `Please verify your email. ${emailToken}`,
            // html: `<strong>Verification Code: </strong>${emailToken}`,
            // html: asdsa,
            template: 'token',
            context: {
                email: htmlData,
            }, // send extra values to template
        };
        console.log('send eamil ===============> ', msg)
        await sendEmail(msg);
        if (template === 'token' || template === 'resetPassword') {
            return emailToken;
        }
        if (template === 'forgotPassword') {
            return newPassword;
        } else {
            return msg;
        }
    } catch (e) {
        return false;
    }
};

// createEmailToken = async () => {
//     const emailToken = randomstring.generate(5);
//     return emailToken;
// }

module.exports = { sendEmailVerification };
