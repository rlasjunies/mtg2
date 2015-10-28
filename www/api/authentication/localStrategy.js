<<<<<<< HEAD
import * as passport_local from "passport-local";
import * as libuser from "../shared/user";
import * as $log from "../services/logger";
var moduleName = "localStratregy - ";
var strategyOptions = { usernameField: "email" };
export function login() {
    return new passport_local.Strategy(strategyOptions, (username, password, done) => {
        $log.profile("passport-login");
        var qryUser = { email: username };
        libuser.userModel().findOne(qryUser, function (err, dbUser) {
            if (err) {
                $log.error("login.findOne error:" + err);
                return done(err);
            }
            if (!dbUser) {
                // TODO again the message is not "readable for the client part
                $log.info("login.dbUser does not exists!");
                return done(null, false, { message: "Wrong email / password" });
            }
            dbUser.comparePasswords(password, (err, isMatching) => {
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "passport-local", "../shared/user", "../services/logger"], factory);
    }
})(function (require, exports) {
    var passport_local = require("passport-local");
    var libuser = require("../shared/user");
    var $log = require("../services/logger");
    var moduleName = "localStratregy - ";
    var strategyOptions = { usernameField: "email" };
    function login() {
        return new passport_local.Strategy(strategyOptions, function (username, password, done) {
            $log.profile("passport-login");
            var qryUser = { email: username };
            libuser.userModel().findOne(qryUser, function (err, dbUser) {
>>>>>>> origin/master
                if (err) {
                    $log.error("login.dbUser.comparePasswords error:" + err);
                    return done(err);
                }
                if (!isMatching) {
                    $log.info("login.dbUser.comparePasswords:" + err);
                    return done(null, false, { message: "Wrong email / password" });
                }
                $log.info("User: %s logged in", dbUser.email);
                return done(null, dbUser);
            });
        });
    });
}
export function register() {
    return new passport_local.Strategy(strategyOptions, (username, password, done) => {
        var userModel = libuser.userModel();
        var qryUser = { email: username };
        libuser.userModel().findOne(qryUser, (err, dbUser) => {
            if (err) {
                $log.error("register.findOne error:" + err);
                return done(err);
            }
            if (dbUser) {
                // TODO message not clear when it happen
                $log.error("register.findOne user already exist in the database!");
                return done(null, false, { message: "email already exists!" });
            }
            var newUser = new userModel({
                email: username,
                password: password
            });
            newUser.save(function (err) {
                if (err) {
                    $log.error("resgister.newUser.save error:" + err);
                    return done(err);
                }
                return done(null, newUser);
            });
        });
    });
}

//# sourceMappingURL=localStrategy.js.map
