
var loader = require("./loader"),
    configs = require("./configs"),
    comopsite = require("./composite");

function ash(app) {
    loader.attach(app);
    return function (req, res, next) {
        next();
    };
}

module.exports = ash;