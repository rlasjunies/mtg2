import * as express from "express";
import * as bodyparser from "body-parser";
import * as morgan from "morgan";
import * as passport from "passport";

import * as xLocalStrategy from "./authentication/localStrategy";
import * as $AuthLocal from "./authentication/localAuth";
import * as $Authorization from "./authorization/authorization.middleware";
import * as xAuthFacebook from "./authentication/facebookAuth";
import * as xAuthGoogle from "./authentication/googleAuth";
import * as xEmailVerif from "./authentication/emailVerification";
import * as $log from "./services/logger";
import * as path from "path";


//Initialisation of the $
import * as $ from "./services/mtg";
$.server.rootPath = __dirname;
$.server.dataPath = path.join($.server.rootPath, "../api_data");
$.server.picturesPath = path.join($.server.dataPath, "pictures");
$.server.rolesFileName = path.join($.server.dataPath, "authorization/roles.json");
$.server.accessRightFileName = path.join($.server.dataPath, "authorization/accessRight.json");
$.server.emailVerificationFileName = path.join($.server.rootPath, "authentication/emailVerification.html");

export var app = express();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import * as xDb from "./services/db";
xDb.connect();

app.use(bodyparser.json());
app.use(passport.initialize());

morgan.token("statuscolorized", (expReq, expRes): string => {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) { color = 31; } // red
    else if (status >= 400) {color = 33;} // yellow
    else if (status >= 300) {color = 36;} // cyan
    return "\x1b[" + color + "m:" + status +"\x1b[0m";
});

app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));

passport.serializeUser((user, done: (err: any, id: any) => void) => {
    done(null, user.id);
});

app.use(function (req: express.Request, res: express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//static files routes
app.use("/", express.static(__dirname + "/../web"));
//app.use("/Scripts", express.static(__dirname + "/../../seedTSClient/libs"));
app.use("/bower_components", express.static(__dirname + "/../bower_components"));
//app.use("/app", express.static(__dirname));
app.use("/styles", express.static(__dirname + "/../styles"));
//app.use("/fonts", express.static(__dirname + "/../../seedTSClient/fonts"));
app.use("/images", express.static(__dirname + "/../images"));
app.use("/pictures", express.static($.server.picturesPath));

//authentication strategy
passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());

//authentication routes
app.post("/auth/register", passport.authenticate("local-register"), $AuthLocal.register);
app.post("/auth/login", passport.authenticate("local-login"), $AuthLocal.login);
app.get("/auth/verifyemail", xEmailVerif.verify);
app.post("/auth/facebook", xAuthFacebook.facebookAuth);
app.post("/auth/google", xAuthGoogle.googleAuth);

//authorization
import * as $AuthorizationRoutes from "./authorization/authorizationRoutes";
rootRoute = "/api/authorization/roles";
app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("ROLES_GET_ALL"), $AuthorizationRoutes.getAllRoles);

//pictures routes
import * as $PicturesRoutes from "./pictures/picturesRoutes";
rootRoute = "/api/pictures/";
app.post(rootRoute + "upload", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_POST_UPLOAD"), $PicturesRoutes.uploadPicture);
//app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_GET_ALL"), $PicturesRoutes.getAllPictures);
app.get(rootRoute, $PicturesRoutes.getAllPictures);
app.delete(rootRoute + ":id", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_DELETE_ID"), $PicturesRoutes.deletePicture);

//users routes
import * as $UsersRoutes from "./users/usersRoutes";
rootRoute = "/api/adm/users/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_POST_CREATE"), $UsersRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_GET_ID"), $UsersRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_DELETE_ID"), $UsersRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_PUT_ID"), $UsersRoutes.update);

rootRoute = "/api/adm/users/me";
app.get(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.findMe);
app.put(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.updateMe);

//paints routes
import * as $PaintsRoutes from "./paints/paintsRoutes";
var rootRoute = "/api/paints/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_POST"),$PaintsRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_GET_ID"), $PaintsRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_DELETE_ID"), $PaintsRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_PUT_ID"), $PaintsRoutes.update);

if (process.env.NODE_ENV === "development") {
    // configure stuff here
}

app.get("*", (req: express.Request, res: express.Response, next) => {
    res.redirect("/index.html");
});

if (!process.env.PORT) { process.env.PORT = 3000; }

var srv = app.listen(process.env.PORT, process.env.IP);
srv.on("listening", () => {
    $log.info("webserver listening http requests on:" + process.env.PORT);
});
