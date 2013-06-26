
var pathlib = require("path");

exports.render = function (map, req, res, callback) {

    var controller,
        abspath;

    abspath = pathlib.join(req.app.get("root"), "node_modules", map.col.module, "ctr.js");

    controller = require(abspath);

    res._render = res.render;

    res.render = function (view, options) {
        res._render(view, options, function (err, data) {
            res.render = res._render;
            res.render(map.tmpl, data);
            console.log(data);
        });
    };

    controller[map.col.action](req, res);
};