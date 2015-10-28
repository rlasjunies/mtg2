import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as $Config from "./config";
import * as $ConfigSecret from "./configSecret";
import * as $log from "./logger";
export var connectDB = Promise.promisify(mongoose.connect, mongoose);
export function connect() {
    $log.debug("process.env:" + process.env.NODE_ENV);
    $log.debug("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env.NODE_ENV]);
    $log.debug("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):"
        + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env]));
    let stringConnect = $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]);
    connectDB(stringConnect, {})
        .then(() => {
        $log.debug("Connected to DB!");
    });
}
export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);

//# sourceMappingURL=../services/db.js.map