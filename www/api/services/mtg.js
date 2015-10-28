<<<<<<< HEAD
import * as $log from "./logger";
import * as stringPolyFill from "./string+";
class Server {
}
class Util {
    constructor() {
        this.string = stringPolyFill;
    }
}
export var util = new Util();
export var server = new Server();
export var log = $log;
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./logger", "./string+"], factory);
    }
})(function (require, exports) {
    var $log = require("./logger");
    var stringPolyFill = require("./string+");
    var Server = (function () {
        function Server() {
        }
        return Server;
    })();
    var Util = (function () {
        function Util() {
            this.string = stringPolyFill;
        }
        return Util;
    })();
    exports.util = new Util();
    exports.server = new Server();
    exports.log = $log;
});
>>>>>>> origin/master

//# sourceMappingURL=mtg.js.map
