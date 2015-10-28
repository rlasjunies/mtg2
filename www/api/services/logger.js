<<<<<<< HEAD
import * as winston from "winston";
// $log.error("error log");
// $log.warn("warn log");
// $log.info("info log");
// $log.debug("debug log");
var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: "cyan",
        info: "green",
        warn: "yellow",
        error: "red"
    }
};
var logger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new (winston.transports.Console)({
            level: "warn",
            colorize: true,
            timestamp: true
        })
    ]
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "winston"], factory);
    }
})(function (require, exports) {
    var winston = require("winston");
    // $log.error("error log");
    // $log.warn("warn log");
    // $log.info("info log");
    // $log.debug("debug log");
    var myCustomLevels = {
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        },
        colors: {
            debug: "cyan",
            info: "green",
            warn: "yellow",
            error: "red"
        }
    };
    var logger = new (winston.Logger)({
        levels: myCustomLevels.levels,
        colors: myCustomLevels.colors,
        transports: [
            new (winston.transports.Console)({
                level: "warn",
                colorize: true,
                timestamp: true
            })
        ]
    });
    return logger;
>>>>>>> origin/master
});

//# sourceMappingURL=logger.js.map
