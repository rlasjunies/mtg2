<<<<<<< HEAD
import * as $NeDBDataStore from "nedb";
export var db = new $NeDBDataStore({ filename: '', autoload: true });
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "nedb"], factory);
    }
})(function (require, exports) {
    var $NeDBDataStore = require("nedb");
    exports.db = new $NeDBDataStore({ filename: '', autoload: true });
});
>>>>>>> origin/master
//export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);

//# sourceMappingURL=core.db.js.map
