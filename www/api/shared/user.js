import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
var userSchema = new mongoose.Schema();
userSchema.add({
    email: String,
    password: String,
    active: Boolean,
    googleId: String,
    facebookId: String,
    displayName: String,
    picture: String,
    allowedRoles: [String]
});
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            //bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return next();
        });
    });
});
userSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};
userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};
export function userModel() {
    return mongoose.model("User", userSchema);
}

//# sourceMappingURL=../shared/user.js.map