(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "mongoose", "bluebird"], function (require, exports) {
    var mongoose = require("mongoose");
    var Promise = require("bluebird");
    var paintSchema = new mongoose.Schema();
    paintSchema.add({
        title: { type: String },
        description: { type: String },
        year: { type: String },
        picture: { type: String },
        order: { type: Number },
        size: { type: String },
        thumbnail: { Type: String }
    });
    function paintModel() {
        return mongoose.model("paint", paintSchema);
    }
    exports.paintModel = paintModel;
    function findPaints(query) {
        return Promise.cast(paintModel().find(query).exec());
    }
    exports.findPaints = findPaints;
    exports.createJob = Promise.promisify(paintModel().create, paintModel());
});

//# sourceMappingURL=../shared/paints.js.map