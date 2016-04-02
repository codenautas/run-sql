"use strict";

var entrypoint = {"path": "lib", "name": "run-sql.js"};

var entrypoints=[
    {"path": "lib", "name": "sql-tools.js"},
    entrypoint
];

var Path = require('path');

entrypoints.forEach(function(entrypoint){
    console.log('transpiling...',entrypoint.name);
    require('es6-transpiler').run({
        filename: Path.dirname(__dirname)+'/'+entrypoint.path+'/'+entrypoint.name,
        outputFilename: Path.dirname(__dirname)+'/'+entrypoint.path+'-trans/'+entrypoint.name
    });
});



