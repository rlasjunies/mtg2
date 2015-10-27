(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./config", "./logger"], factory);
    }
})(function (require, exports) {
    var $Config = require("./config");
    var $log = require("./logger");
    //import $db = require("./db.nedb");
    exports.log = $log;
    exports.config = $Config;
});
//export var db = $db; 

//# sourceMappingURL=core.js.map
