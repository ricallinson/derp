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

/*jslint nomen: true, stupid: true*/

"use strict";

var program = require('commander'),
    path = require('path'),
    fs = require('fs'),
    commandsDir = path.join(__dirname, 'commands');

// Set the version
program.version('0.0.0');
program.option("-v, --verbose", "runtime info");

require("ash/lib/commands/start");

// Add all the local commands
fs.readdirSync(commandsDir).forEach(function (filename) {
    if (!/\.js$/.test(filename)) {
        return;
    }
    require(path.join(commandsDir, filename));
});

// If we have no arguments show the help
if (process.argv.length <= 2) {
    process.argv.push('--help');
}

program.parse(process.argv);
