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

st.grab(['client','example']);

st.grab.example('7');

console.log('st.example',st.example)

st.connect().then(st.grab.client).then(function(){
    console.log('connected');
    st.client.done();
}).catch(function(err){
    console.log(err);
    console.log(err.stack);
});
