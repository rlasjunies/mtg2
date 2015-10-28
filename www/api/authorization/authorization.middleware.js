import * as $ from "../services/mtg";
import * as fs from "fs-extra";
var moduleName = "authorizationService@";
export function checksRole(roles) {
    return function (req, res, next) {
        var allowed = false;
        for (var role of roles) {
            if (req.user.allowedRoles.indexOf(role) !== -1) {
                allowed = true;
            }
        }
        if (!allowed) {
            var msg = "Not allowed; Missing role:" + roles.concat(",");
            $.log.info(msg);
            res.status(403).send({ message: msg });
        }
        else {
            next();
        }
    };
}
export function checksAccessRight(accessRight) {
    return function (req, res, next) {
        var allowed = false;
        loadAccessRightFromRoles(req.user.allowedRoles, (accessRights) => {
            //$.log.info(`found:${accessRight} in :[${JSON.stringify(accessRights)}]`)
            $.log.info("accessRights:" + JSON.stringify(accessRights));
            $.log.info(`accessRights.indexOf(${accessRight}):` + accessRights.indexOf(accessRight));
            if (accessRights.indexOf(accessRight) !== -1) {
                allowed = true;
            }
            if (!allowed) {
                var msg = "Not allowed; Missing accessRight:" + accessRight;
                $.log.warn(msg);
                res.status(403).send({ message: msg });
            }
            else {
                next();
            }
        });
    };
}
function loadAccessRightFromRoles(userRoles, callback) {
    fs.exists($.server.rolesFileName, (isFileExisting) => {
        if (!isFileExisting) {
            callback([]);
        }
        else {
            fs.readFile($.server.rolesFileName, "utf8", (err, data) => {
                if (err) {
                    callback([]);
                }
                else {
                    let accessRights = [];
                    let fileRoles = JSON.parse(data.slice(1)); //I've got an strange caracter at the beginning => slice it
                    //concat all the accessright arrays
                    for (let userRole of userRoles) {
                        let fileRole;
                        $.log.debug(`userrole:${userRole}`);
                        for (let tmpFileRole of fileRoles) {
                            if (tmpFileRole.id == userRole) {
                                fileRole = tmpFileRole;
                            }
                        }
                        if (fileRole) {
                            accessRights = accessRights.concat(fileRole.accessrights);
                        }
                        else {
                            $.log.error(`Unknown role:${userRole}`);
                        }
                    }
                    $.log.info(`accessright: ${accessRights.toString()} \n allowed for:${userRoles}`);
                    callback(accessRights);
                }
            });
        }
    });
}

//# sourceMappingURL=../authorization/authorization.middleware.js.map