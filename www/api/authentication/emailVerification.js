<<<<<<< HEAD
import * as _ from "underscore";
import * as jwt from "jwt-simple";
import * as fs from "fs";
import * as nodemailer from "nodemailer";
import * as $ConfigSecret from "../services/configSecret";
import * as $Config from "../services/config";
import * as xUser from "../shared/user";
import * as $ from "../services/mtg";
export function send(email, res) {
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, $ConfigSecret.EMAIL_SECRET);
    //var nSMTPTransportOptions: NodemailerSMTPTransportOptions = {
    let nSMTPTransportOptions = {
        service: "Gmail",
        auth: {
            user: "rlasjunies@gmail.com",
            pass: $ConfigSecret.SMTP_PASS
        }
    };
    var transporter = nodemailer.createTransport(nSMTPTransportOptions);
    var mailOptions = {
        from: "Richard Lasjunies<rlasjunies@gmail.com>",
        to: email,
        subject: "PS Jwt Account verification",
        html: getHtml(token)
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            $.log.error(`Verification email - Error sending to:${mailOptions.to}`);
        }
        else {
            $.log.info("Verification email sent to:" + mailOptions.to);
        }
    });
}
export function verify(req, res, next) {
    var token = req.query.token;
    var payload = jwt.decode(token, $ConfigSecret.EMAIL_SECRET);
    var email = payload.sub;
    if (!email) {
        return handleError(res);
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "underscore", "jwt-simple", "fs", "nodemailer", "../services/configSecret", "../services/config", "../shared/user", "../services/mtg"], factory);
    }
})(function (require, exports) {
    var _ = require("underscore");
    var jwt = require("jwt-simple");
    var fs = require("fs");
    var nodemailer = require("nodemailer");
    var $ConfigSecret = require("../services/configSecret");
    var $Config = require("../services/config");
    var xUser = require("../shared/user");
    var $ = require("../services/mtg");
    function send(email, res) {
        var payload = {
            sub: email
        };
        var token = jwt.encode(payload, $ConfigSecret.EMAIL_SECRET);
        //var nSMTPTransportOptions: NodemailerSMTPTransportOptions = {
        var nSMTPTransportOptions = {
            service: "Gmail",
            auth: {
                user: "rlasjunies@gmail.com",
                pass: $ConfigSecret.SMTP_PASS
            }
        };
        var transporter = nodemailer.createTransport(nSMTPTransportOptions);
        var mailOptions = {
            from: "Richard Lasjunies<rlasjunies@gmail.com>",
            to: email,
            subject: "PS Jwt Account verification",
            html: getHtml(token)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                $.log.error("Verification email - Error sending to:" + mailOptions.to);
            }
            else {
                $.log.info("Verification email sent to:" + mailOptions.to);
            }
        });
>>>>>>> origin/master
    }
    var users = xUser.userModel();
    users.findOne({ email: email }, (err, userFound) => {
        if (err) {
            return res.status(500);
        }
        if (!userFound) {
            return handleError(res);
        }
        if (!userFound.active) {
            userFound.active = true;
        }
        userFound.save((err, userFound) => {
            if (err) {
                return res.status(500);
            }
            return res.redirect($Config.appUrl[process.env]);
        });
    });
}
function handleError(res) {
    return res.status(401).send({
        message: "Authentication failed, enable to verify the email"
    });
}
function getHtml(token) {
    var model = {
        // TODO to make generic
        verifyUrl: "http://localhost:3000/auth/verifyemail?token=" + token,
        title: "psJwt",
        subTitle: "Thanks for signing up!",
        body: "Please, verify your email address by clicking the button below."
    };
    // TODO replace readFileSync by Async
    var html = fs.readFileSync($.server.emailVerificationFileName, { encoding: "utf8" });
    var template = _.template(html);
    var sReturn = template(model);
    return sReturn;
}
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

//# sourceMappingURL=emailVerification.js.map
