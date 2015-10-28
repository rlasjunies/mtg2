//import mongoose = require("mongoose");
//import Promise = require("bluebird");
//import $Config = require("./config");
//import $ConfigSecret = require("./configSecret");
import * as $log from "./logger";
import * as $NeDBDataStore from "nedb";

export var db = new $NeDBDataStore({ filename: '', autoload: true });

//export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
