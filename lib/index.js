//    (The MIT License)
//
//    Copyright (c) 2012 Richard S Allinson <rsa@mountainmansoftware.com>
//
//    Permission is hereby granted, free of charge, to any person obtaining
//    a copy of this software and associated documentation files (the
//    "Software"), to deal in the Software without restriction, including
//    without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//    permit persons to whom the Software is furnished to do so, subject to
//    the following conditions:
//
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

/*
    Load the modules required.
*/

var program = require("commander"),
    express = require("express"),
    consolidate = require("consolidate"),
    pathlib = require("path"),
    http = require("http"),
    ash = require("./ash"),
    configs = require("./ash/configs"),
    app = express();

/*
    Added command line options.
*/

program.version("0.0.1");
program.option("-p, --port [port]", "which port to use");

/*
    Parse the command line inputs.
*/

program.parse(process.argv);

/*
    Set the root, conf and port in express.
*/

app.set("root", process.cwd());
app.set("modules dir", pathlib.join(app.get("root"), "node_modules"));
app.set("conf", configs.read(app.get("root"), __dirname));
app.set("port", program.port || app.get("conf").app.port);
app.set("view engine", "html");
app.set("views", pathlib.join(app.get("root"), "node_modules"));

/*
    Use Handlebars.
*/

app.engine(app.get("view engine"), consolidate.handlebars);

/*
    Boot the MVC system.
*/

app.use(ash(app));

/*
    Load all other middleware.
*/

app.use(express.favicon());
app.use(express.logger(app.get("conf").app.loglevel));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(app.get("conf").app.cookie));
app.use(express.session({secret: app.get("conf").app.session}));
app.use(express.errorHandler());

/*
    Start the server.
*/

http.createServer(app).listen(app.get("port"), function () {
    console.log("Derp server listening on port " + app.get("port"));
});
