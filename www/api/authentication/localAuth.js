<<<<<<< HEAD
import * as jwt from "jwt-simple";
import * as moment from "moment";
import * as $Token from "./token";
import * as $EmailVerification from "./emailVerification";
import * as $log from "../services/logger";
import * as $configSecret from "../services/configSecret";
import * as $ from "../services/mtg";
import * as $usersModel from "../shared/user";
var moduleName = "localAuth";
export function register(expReq, expRes, info) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}
export function login(expReq, expRes, info) {
    $Token.createSendToken(expReq.user, expRes);
}
export function authenticationCheck(expReq, expRes, next) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    }
    else {
        $log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var authorization = expReq.headers["authorization"];
        var token = authorization.split(" ")[1];
        try {
            var payload = jwt.decode(token, $configSecret.JWT_SECRET);
        }
        catch (e) {
            payload = {};
        }
        if (!payload.sub) {
            return expRes.status(401).send({ message: "Authentication failed" });
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "jwt-simple", "moment", "./token", "./emailVerification", "../services/logger", "../services/configSecret", "../services/mtg", "../shared/user"], factory);
    }
})(function (require, exports) {
    var jwt = require("jwt-simple");
    var moment = require("moment");
    var $Token = require("./token");
    var $EmailVerification = require("./emailVerification");
    var $log = require("../services/logger");
    var $configSecret = require("../services/configSecret");
    var $ = require("../services/mtg");
    var $usersModel = require("../shared/user");
    var moduleName = "localAuth";
    function register(expReq, expRes, info) {
        $EmailVerification.send(expReq.body.email, expRes);
        $Token.createSendToken(expReq.user, expRes);
    }
    exports.register = register;
    function login(expReq, expRes, info) {
        $Token.createSendToken(expReq.user, expRes);
    }
    exports.login = login;
    function authenticationCheck(expReq, expRes, next) {
        if (!expReq.headers["authorization"]) {
            return expRes.status(401).send({ message: "you are not authorized!" });
>>>>>>> origin/master
        }
        else {
            if (moment.unix(payload.exp).diff(moment(), 'second') < 0) {
                console.log("!!!!token expired!!!");
            }
            //load user info
            var users = $usersModel.userModel();
            var qry = { _id: payload.sub };
            users.find(qry, (err, user) => {
                if (err) {
                    return expRes.status(500).write({ message: "Error trying to find the user." + JSON.stringify(err) });
                }
                $.log.debug("expReq.params.id:" + expReq.params.id);
                $.log.profile(moduleName + "@find");
                //expRes.status(200).send(user);
                expReq.user = user[0]._doc;
                next();
            });
        }
    }
}

//# sourceMappingURL=localAuth.js.map
