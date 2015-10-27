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

//# sourceMappingURL=mtg.js.map
