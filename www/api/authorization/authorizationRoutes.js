<<<<<<< HEAD
import * as fs from "fs-extra";
import * as $ from "../services/mtg";
var moduleName = "authorizationRoutes@";
export function getAllRoles(expReq, expRes, next) {
    //TODO refactor the code to provide a generic file function and share it with hasRole function ...
    var sourceFile = $.server.rolesFileName;
    $.log.info("read roles file:" + sourceFile);
    fs.exists(sourceFile, (isFileExisting) => {
        if (!isFileExisting) {
            expRes
                .status(406)
                .header({ 'content-type': 'application/json' })
                .send({ error: true, errorMsg: "Roles File is missing" });
        }
        else {
            fs.readFile(sourceFile, "utf8", (err, data) => {
                if (err) {
                    expRes.status(500)
                        .header({ 'content-type': 'application/json' })
                        .send({ error: true, errorMsg: "Error Reading Access right files" });
                }
                else {
                    expRes
                        .status(200)
                        .header({ 'content-type': 'application/json' })
                        .send(data);
                }
            });
        }
    });
}
=======
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "fs-extra", "../services/mtg"], factory);
    }
})(function (require, exports) {
    var fs = require("fs-extra");
    var $ = require("../services/mtg");
    var moduleName = "authorizationRoutes@";
    function getAllRoles(expReq, expRes, next) {
        //TODO refactor the code to provide a generic file function and share it with hasRole function ...
        var sourceFile = $.server.rolesFileName;
        $.log.info("read roles file:" + sourceFile);
        fs.exists(sourceFile, function (isFileExisting) {
            if (!isFileExisting) {
                expRes
                    .status(406)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: true, errorMsg: "Roles File is missing" });
            }
            else {
                fs.readFile(sourceFile, "utf8", function (err, data) {
                    if (err) {
                        expRes.status(500)
                            .header({ 'content-type': 'application/json' })
                            .send({ error: true, errorMsg: "Error Reading Access right files" });
                    }
                    else {
                        expRes
                            .status(200)
                            .header({ 'content-type': 'application/json' })
                            .send(data);
                    }
                });
            }
        });
    }
    exports.getAllRoles = getAllRoles;
});
>>>>>>> origin/master

//# sourceMappingURL=authorizationRoutes.js.map
