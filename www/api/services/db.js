<<<<<<< HEAD
import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as $Config from "./config";
import * as $ConfigSecret from "./configSecret";
import * as $log from "./logger";
export var connectDB = Promise.promisify(mongoose.connect, mongoose);
export function connect() {
    $log.debug("process.env:" + process.env.NODE_ENV);
    $log.debug("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env.NODE_ENV]);
    $log.debug("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):"
        + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env]));
    let stringConnect = $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]);
    connectDB(stringConnect, {})
        .then(() => {
        $log.debug("Connected to DB!");
    });
}
export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "mongoose", "bluebird", "./config", "./configSecret", "./logger"], factory);
    }
})(function (require, exports) {
    var mongoose = require("mongoose");
    var Promise = require("bluebird");
    var $Config = require("./config");
    var $ConfigSecret = require("./configSecret");
    var $log = require("./logger");
    exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
    function connect() {
        $log.debug("process.env:" + process.env.NODE_ENV);
        $log.debug("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env.NODE_ENV]);
        $log.debug("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):"
            + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env]));
        var stringConnect = $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]);
        exports.connectDB(stringConnect, {})
            .then(function () {
            $log.debug("Connected to DB!");
        });
    }
    exports.connect = connect;
    exports.disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
});
>>>>>>> origin/master

//# sourceMappingURL=db.js.map
