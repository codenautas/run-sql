"use strict";

var entrypoint = {"path": "lib", "name": "run-sql.js"};

var Path = require('path');

console.log('transpiling...',entrypoint.name);

require('es6-transpiler').run({
    filename: Path.dirname(__dirname)+'/'+entrypoint.path+'/'+entrypoint.name,
    outputFilename: Path.dirname(__dirname)+'/'+entrypoint.path+'-trans/'+entrypoint.name
});
