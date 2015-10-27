(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    var secret = {
        FACEBOOK_SECRET: "bad10701c307ea59dfb2933d98c372e2",
        GOOGLE_SECRET: "zHGwmD7bLHOuPVn9QZlzOH5l",
        JWT_SECRET: "SECRET",
        EMAIL_SECRET: "SECRET",
        SMTP_PASS: "L@sjunies01",
        db: {
            production: "rlasjunies:1234",
            development: "",
            test: ""
        }
    };
    return secret;
});

//# sourceMappingURL=configSecret.js.map
