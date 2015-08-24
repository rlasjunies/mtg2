(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "./config", "./logger"], function (require, exports) {
    var $Config = require("./config");
    var $log = require("./logger");
    //import $db = require("./db.nedb");
    exports.log = $log;
    exports.config = $Config;
});
//export var db = $db; 

//# sourceMappingURL=../services/core.js.map