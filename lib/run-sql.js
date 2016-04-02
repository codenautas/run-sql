"use strict";
/*jshint eqnull:true */
/*jshint node:true */
/*eslint-disable no-console */

console.log('in construction!');

var program = require('commander');
var Promises = require('promise-plus');
var fs = require('fs-promise');
var Path = require('path');

var st = require(__dirname+'/sql-tools');

program
    .version(require('../package').version)
    .usage('[options]')
    .option('-d, --dir [dir]', 'Name of the directory where is the config files')
    .option('-c, --command [sentence]', 'Sentence to execute')
    .option('-v, --verbose', 'Verbose')
    .parse(process.argv);

if(program.dir){
    process.chdir(program.dir);
}

st.grab(['client','example']);

if(!process.argv.length){
    program.help();
    return;
}

st.connect(program).then(st.grab.client).then(function(){
    if(program.command){
        return st.client.query(program.command).fetchAll();
    }
}).then(function(result){
    if(result.rows){
        console.log('ROWS');
        console.log(result.rows);
    }else{
        console.log('NO ROWS');
        console.log(result);
    }
    st.client.done();
}).catch(function(err){
    console.log(err);
    console.log(err.stack);
    return 1;
}).then(process.exit);
