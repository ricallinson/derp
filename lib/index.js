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
    http = require("http"),
    eml = require("./express-loader"),
    pathlib = require("path"),
    app = express();

/*
    Added command line options.
*/

program.version("0.0.1");
program.option("-p, --port [port]", "which port to use", 3000);
program.option("-r, --root [dir]", "which directory to run from", process.cwd());

/*
    Parse the command line inputs.
*/

program.parse(process.argv);

/*
    Convert the program.root to an absolute path.
*/

program.root = pathlib.resolve(program.root);

/*
    Set the current working directory to the given root.
*/

process.chdir(program.root);

/*
    Set the root and port in express.
*/

app.set("root", program.root);
app.set("port", program.port);

/*
    Boot the MVC system.
*/

eml.attach(app);

/**/

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(express.session());
app.use(express.errorHandler());

http.createServer(app).listen(app.get("port"), function () {
    console.log("Derp server listening on port " + app.get("port"));
});
