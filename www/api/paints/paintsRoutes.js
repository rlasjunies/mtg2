import * as $log from "../services/logger";
import * as $paintsModel from "../shared/paints";
var moduleName = "paintsRoutes@";
//Create
export function create(expReq, expRes, next) {
    $log.profile(moduleName + "@create");
    //$log.debug(moduleName + "@create\n" + expReq.body);
    var paintModel = $paintsModel.paintModel();
    var newPaint = new paintModel(expReq.body);
    newPaint.validate(function (err) {
        newPaint.save((err, paint) => {
            if (err) {
                return expRes.status(500).write({ message: "Error writing job!" });
            }
            $log.debug(moduleName + "@create:\n" + paint);
            $log.profile(moduleName + "@create");
            return expRes.status(200).send(paint);
        });
    });
}
;
//find
export function find(expReq, expRes, next) {
    $log.profile(moduleName + "@find");
    var paints = $paintsModel.paintModel();
    var qry = {};
    if (expReq.params.id) {
        qry = { _id: expReq.params.id };
    }
    paints.find(qry, (err, paint) => {
        if (err) {
            return expRes.status(500).write({ message: "Error getting jobs!" });
        }
        $log.debug("expReq.params.id:" + expReq.params.id);
        $log.profile(moduleName + "@find");
        expRes.status(200).send(paint);
    });
    //}
}
;
//remove
export function remove(expReq, expRes, next) {
    $log.profile(moduleName + "@remove");
    var mdlPaints = $paintsModel.paintModel();
    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }
    mdlPaints.findByIdAndRemove(expReq.params.id, (err, paints) => {
        if (err) {
            return expRes.status(500).write({ message: "Error getting paints!" });
        }
        $log.profile(moduleName + "@remove");
        expRes.status(200).send(paints);
    });
}
;
//update
export function update(expReq, expRes, next) {
    $log.profile(moduleName + "@update");
    var mdlPaints = $paintsModel.paintModel();
    var paint = $paintsModel.paintModel();
    var newPaint = new paint(expReq.body);
    if (!expReq.params.id) {
        throw new Error("Is parameter is required!");
    }
    mdlPaints.findByIdAndUpdate(expReq.params.id, newPaint, (err, paints) => {
        if (err) {
            return expRes.status(500).write({ message: "Error updating paint!" });
        }
        $log.profile(moduleName + "@update");
        expRes.status(200).send(paints);
    });
}
;

//# sourceMappingURL=../paints/paintsRoutes.js.map