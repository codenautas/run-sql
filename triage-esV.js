"use strict";
/*jshint eqnull:true */
/*jshint node:true */
/*eslint-disable no-console */

// CMD-TOOL

var entrypoint = {"path": "lib", "name": "run-sql.js"};

if(process.version.match(/v0/)){
    require("es6-shim");
    entrypoint.path += '-trans';
}

module.exports = require('./'+entrypoint.path+'/'+entrypoint.name);
