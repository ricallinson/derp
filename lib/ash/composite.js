// (The MIT License)

// Copyright (c) 2012 Richard S Allinson <rsa@mountainmansoftware.com>

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

/*
    Load required modules.
*/

var pathlib = require("path");

exports.dispatch = function (cfg, req, res, cb) {

    var controller,
        abspath;

    abspath = pathlib.join(req.app.get("root"), "node_modules", cfg.module);

    controller = require(abspath);

    res._render = res.render;

    res.render = function (view, options) {
        res._render(view, options, function (err, data) {
            res.render = res._render;
            cb(err, data);
        });
    };

    controller[cfg.action](req, res);
};

exports.render = function (map, req, res, cb) {

    var buffer = {},
        handler,
        count = 0,
        index;

    if (!cb) {
        cb = function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render(map.tmpl, data);
        };
    }

    handler = function (err, data) {
        count = count - 1;
        if (err) {
            console.log(err);
        }
        buffer[index] = data;
        if (count <= 0) {
            cb(err, buffer);
        }
    };

    for (index in map.slots) {
        count = count + 1;
        this.dispatch(map.slots[index], req, res, handler);
    }
};
