const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const winston = require('winston');
const randomstring = require('randomstring');
const User = require('../../models/User');
const config = require('../../config/app');
const {sendEmailVerification} = require('../../service/auth');
const {sendEmail} = require('../../service/mailService');
const packageService = require('../../service/packageService');
const EmailTemplate = require('../../models/EmailTemplate');
const DOMParser = require('dom-parser');

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @returns {*}
 */

login = async (req, res) => {
    const {email, password} = req.body;
    // console.log('req.body', req.body)
    try {
        let user = await User.findOne({
            email: email
        }).select('password').exec();
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                error: [{msg: 'auth_cannot_find_user', errorCode: 'noUser'}],
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                statusCode: 401,
                error: [{
                    msg: 'auth_invalid_credential',
                    errorCode: 'invalidCredentials',
                }],
            });
        }
        const sign = {
            // exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
            sub: user._id,                                          // Identifies the subject of the JWT.
        };
        let token = jwt.sign(sign, config.jwtSecret);
        user.token = token;
        user.save();
        user = await User.findOne({email: email});
        if (!user.status)
            return res.status(201).json({
                statusCode: 201,
                error: [{
                    msg: 'disabled_user',
                    errorCode: 'disabledUser',
                }],
            });
        return res.status(200).json({
            statusCode: 200,
            data: {
                id: user._id,
                token: token,
                currentUser: user,
            },
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: "auth_server_error", errorCode: 'serverError'}],
        });
    }
};

checkExist = async (req, res) => {
    let {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(201).json({
                statusCode: 201,
                error: [{msg: 'Email Duplicated', errorCode: 'registerError'}],
            });
        } else {
            let code = await sendEmailVerification(name, email, 'token');
            if (!code)
                return res.status(500).json({
                    statusCode: 500,
                    error: [{ msg: 'Send Verify Email Failed', errorCode: 'registerError' }],
                });
            // let code = '12345'; // Test Code
            const sign = {
                exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
                sub: {
                    code,
                    email,
                    password,
                    name,
                },      // Identifies the subject of the JWT.
            };
            let token = jwt.sign(sign, config.jwtSecret);
            return res.status(200).json({
                statusCode: 200,
                data: {
                    token: token
                }
            });
        }
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'registerError'}],
        });
    }
};

register = async (req, res) => {
    let {token, code} = req.body;
    // console.log(token, code, name, email, password)
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded)
            return res.status(201).json({
                statusCode: 201,
                error: [{msg: 'Code Expired', errorCode: 'expiredVerify'}],
            });
        if (decoded.sub.code !== code)
            return res.status(201).json({
                statusCode: 201,
                error: [{msg: 'Code Invalid', errorCode: 'invalidCode'}],
            });
        let {name, email, password} = decoded.sub;
        let createdUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        winston.info('createdUser', createdUser);
        winston.info("created " + createdUser);
        const sign = {
            // exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
            sub: createdUser._id,                                          // Identifies the subject of the JWT.
        };
        let code1 = await sendEmailVerification(name, email, 'register');
        // console.log('code', code)
        if (!code1)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Send Verify Email Failed', errorCode: 'registerError'}],
            });
        await packageService.createTrialPackage(createdUser._id);
        winston.info('packageService', packageService);
        let reToken = jwt.sign(sign, config.jwtSecret);
        winston.info('reToken', reToken);
        createdUser.token = reToken;
        createdUser.save();
        let a = res.status(200).json({
            statusCode: 200,
            data: {
                id: createdUser._id,
                token: reToken,
                user: createdUser
            },
        });
        winston.info('res', res);
        return a;
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'registerError'}],
        });
    }

};

/**
 * reset password ( reset password )
 * $method GET
 * @param req: token, oldPassword, newPassword
 * @param res:
 */

canResetPassword = async (req, res) => {
    let {token, oldPassword} = req.body;
    // console.log('oldPassword', oldPassword)
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Credential Expired', errorCode: 'expired'}],
            });
        }
        let user = await User.findOne({token}).select('password').exec();
        if (!user)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
            });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        // console.log('isMatch', isMatch)
        if (!isMatch) {
            return res.status(500).json({
                statusCode: 500,
                error: [{
                    msg: 'auth_invalid_password',
                    errorCode: 'invalidPassword',
                }],
            });
        }
        user = await User.findOne({token});
        let code = await sendEmailVerification(user.name, user.email, 'resetPassword');
        if (!code)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Send Verify Email Failed', errorCode: 'networkError'}],
            });
        // let code = '12345'; // Test Code
        const sign = {
            exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
            sub: code,      // Identifies the subject of the JWT.
        };
        let newToken = jwt.sign(sign, config.jwtSecret);
        return res.status(200).json({
            statusCode: 200,
            data: {
                token: newToken
            }
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'resetError'}],
        });
    }
};

resetPassword = async (req, res) => {
    let {token, newToken, code, oldPassword, newPassword} = req.body;
    try {
        const decoded = jwt.verify(newToken, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Credential Expired', errorCode: 'expired'}],
            });
        }
        if (decoded.sub !== code)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Code Invalid', errorCode: 'invalidCode'}],
            });
        let user = await User.findOne({token}).select('password').exec();
        if (!user)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
            });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).json({
                statusCode: 500,
                error: [{
                    msg: 'auth_invalid_password',
                    errorCode: 'invalidPassword',
                }],
            });
        }
        user.password = newPassword;
        user.save();
        return res.status(200).json({
            statusCode: 200,
        });
    } catch (e) {
        winston.error(e.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: e.message, errorCode: 'resetError'}],
        });
    }
};

forgotPassword = async (req, res) => {
    let {email} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
            });
        const sign = {
            exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time ( 5 mins)
            sub: user._id,      // Identifies the subject of the JWT.
        };
        let token = jwt.sign(sign, config.jwtSecret);
        // let newPassword = await sendEmailVerification(user.name, email, 'forgotPassword');
        // let newPassword = '123123';
        // console.log('code', newPassword);
        // if (!newPassword)
        //     return res.status(500).json({
        //         statusCode: 500,
        //         error: [{msg: 'Send Verify Email Failed', errorCode: 'registerError'}],
        //     });
        // let a = await EmailTemplate.find({ name: 'forgotPassword' });
        // let asd = new DOMParser().parseFromString(a[0].code, "text/xml");
        // let htmlData = asd.rawHTML.replace("{newPassword_URL}", newPassword);
        // let url = process.env.NODE_ENV === 'development' ? `localhost:8080/forgot/${token}` : `${req.headers.host}/forgot/${token}`;
        // console.log('url ==> ', url, process.env.NODE_ENV, process.env.NODE_ENV === 'development');
        let hostname = encodeURI(`${req.headers.origin}/forgot/${token}`);
        await sendEmailVerification(user.name, email, 'forgotPassword', hostname);
        // console.log('htmlData ==> ', htmlData, req.headers.origin)
        // const msg = {
        //     to: email,
        //     from: 'no-reply@crioon.com',
        //     subject: a[0].subject,
        //     text: 'Your password was renewed.',
        //     template: 'token',
        // };
        // await sendEmail(msg);
        // console.log('passmsg', msg);
        // user.password = newPassword;
        // user.password = '123456';
        // user.save();
        return res.status(200).json({
            statusCode: 200,
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'forgotError'}],
        });
    }
};

reNewPassword = async (req, res) => {
    let {token, newPassword} = req.body;
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Token Expired', errorCode: 'TokenExpired'}],
            });
        }
        let user_id = decoded.sub;
        console.log('user id ==> ', user_id);
        let user = await User.findOne({_id: user_id}).select('password').exec();
        if (!user)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
            });
        console.log('user ==> ', user);
        user.password = newPassword;
        user.save();
        return res.status(200).json({
            statusCode: 200,
        });
    } catch (e) {
        winston.error(e.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: e.message, errorCode: 'resetError'}],
        });
    }
};

/*
* Clear all tokens
* */
logout = (req, res) => {
    let {token} = req.body;
    try {
        jwt.destroy(token);
        return res.status(200).json({
            statusCode: 200,
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'forgotError'}],
        });
    }
};

getCurrentUser = async (req, res) => {
    let {token} = req.body;
    try {
        let user = await User.findOne({token});
        if (!user)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
            });
        /*let uID = user._id;
        await packageService.updatePackageStatus(uID)*/
        return res.status(200).json({
            statusCode: 200,
            data: {
                currentUser: user,
            }
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'forgotError'}],
        });
    }
};

canUpdateProfile = async (req, res) => {
    let {token, oldEmail} = req.body;
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Credential Expired', errorCode: 'expired'}],
            });
        }
        let user = await User.findOne({token});
        let code = await sendEmailVerification(user.name, oldEmail, 'updateProfile');
        if (!code)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Send Verify Email Failed', errorCode: 'networkError'}],
            });
        // let code = '12345'; // Test Code
        const sign = {
            exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
            sub: code,      // Identifies the subject of the JWT.
        };
        let newToken = jwt.sign(sign, config.jwtSecret);
        return res.status(200).json({
            statusCode: 200,
            data: {
                token: newToken
            }
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'resetError'}],
        });
    }
};
/*

updateProfile = async (req, res) => {
    let {token, code, profile} = req.body;
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Credential Expired', errorCode: 'expired'}],
            });
        }
        if (decoded.sub !== code)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Code Invalid', errorCode: 'invalidCode'}],
            });
        await User.findOneAndUpdate({token: profile.token}, profile);
        return res.status(200).json({
            statusCode: 200,
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'resetError'}],
        });
    }
}
*/

updateProfile = async (req, res) => {
    let {profile} = req.body;
    try {
        /*const decoded = jwt.verify(token, config.jwtSecret);
        if (!decoded) {
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Credential Expired', errorCode: 'expired'}],
            });
        }
        if (decoded.sub !== code)
            return res.status(500).json({
                statusCode: 500,
                error: [{msg: 'Code Invalid', errorCode: 'invalidCode'}],
            });*/
        await User.findOneAndUpdate({token: profile.token}, profile);
        let user = await User.findOne({token: profile.token});
        return res.status(200).json({
            statusCode: 200,
            data: user
        });
    } catch (err) {
        winston.error(err.message);
        return res.status(500).json({
            statusCode: 500,
            error: [{msg: err.message, errorCode: 'resetError'}],
        });
    }
};

/**
 * Returns user info
 * @param req
 * @param res
 * @returns {*}
 */
function me(req, res) {
    res.json({
        message: "success",
        data: req.user
    });
}

module.exports = {
    login,
    register,
    checkExist,
    canResetPassword,
    resetPassword,
    forgotPassword,
    logout,
    getCurrentUser,
    canUpdateProfile,
    updateProfile,
    reNewPassword,
    me
};
