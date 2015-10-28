import * as mongoose from "mongoose";
import * as Promise from "bluebird";
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
export function paintModel() {
    return mongoose.model("paint", paintSchema);
}
export function findPaints(query) {
    return Promise.cast(paintModel().find(query).exec());
}
export var createJob = Promise.promisify(paintModel().create, paintModel());

//# sourceMappingURL=../shared/paints.js.map