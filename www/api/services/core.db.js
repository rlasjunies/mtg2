(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "nedb"], function (require, exports) {
    var $NeDBDataStore = require("nedb");
    exports.db = new $NeDBDataStore({ filename: '', autoload: true });
});
//export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);

//# sourceMappingURL=../services/core.db.js.map