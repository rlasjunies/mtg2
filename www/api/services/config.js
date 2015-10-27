(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    var config = {
        dbConnectString: {
            production: "mongodb://XXXXXX@ds047030.mongolab.com:47030/jobfinder299",
            development: "mongodb://localhost/jobfinder",
            test: "mongodb://localhost/jobfinder",
        },
        appUrl: {
            production: "",
            development: "http://localhost:3000",
            test: "http://localhost:3000",
        }
    };
    return config;
});

//# sourceMappingURL=config.js.map
