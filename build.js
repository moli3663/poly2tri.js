/*
 * Poly2Tri Copyright (c) 2009-2013, Poly2Tri Contributors
 * http://code.google.com/p/poly2tri/
 * 
 * poly2tri.js (JavaScript port) (c) 2009-2013, Poly2Tri Contributors
 * https://github.com/r3mi/poly2tri.js
 * 
 * Build script for poly2tri.js
 * Rémi Turboult, 12/2013
 * 
 * All rights reserved.
 * 
 * Distributed under the 3-clause BSD License, see LICENSE.txt
 */

"use strict";

var browserify = require('browserify');
var fs = require('fs');
var uglify = require('uglify-js');
var pkg = require('./package.json');

var today = new Date().toJSON().slice(0, 10);
var preamble = '/*! ' + pkg.name + ' v' + pkg.version + ' | built ' + today + ' | (c) 2009-2013 Poly2Tri Contributors */\n';

var b = browserify();
b.add('./src/poly2tri.js');
b.bundle({standalone: 'poly2tri'}, function(err, code) {
    fs.writeFileSync('./dist/poly2tri.js', code);

    var min = uglify.minify(code, {fromString: true, compress: true, mangle: true});
    fs.writeFileSync('./dist/poly2tri.min.js', preamble + min.code);
});
