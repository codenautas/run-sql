"use strict";
/*jshint eqnull:true */
/*jshint node:true */
/*eslint-disable no-console */

var sqlTools = {};

var _ = require('lodash');
var Promises = require('promise-plus');
var MiniTools = require('mini-tools');
var pg = require('pg-promise-strict');
var changing = require('best-globals').changing;

sqlTools.grab = function grab(properties){
}

sqlTools.grab = function grab(properties){
    var self = this;
    this.grabbeds=this.grabbeds||{};
    var target = this.grabbeds;
    _.forEach(properties, function(name){
        Object.defineProperty(self.grab, name, {
            configurable: false,
            writable: false,
            value: function recibeGrabValue(value){
                target[name] = value;
            }
        });
        if(name in self){
            throw new Exception('grabs properties must not exist in the destination object');
        }
        Object.defineProperty(self, name, {
            configurable: false,
            get: function grabbedValue(){
                return target[name];
            }
        });
    });
}

sqlTools.connect = function connect(opts){
    var local={};
    opts = opts || {};
    opts.configList = opts.configList || [
        'def-config.yaml',
        'local-config.yaml'
    ];
    return Promises.start(function(){
        return MiniTools.readConfig(opts.configList, {whenNotExist:'ignore'});
    }).then(function(config){
        local.config = config;
    }).then(function(){
        var startTS = new Date();
        if(!local.config.db){
            throw new Error('config not found');
        }
        return pg.connect(local.config.db).then(function(client){
            local.db = pg;
            if(!local.db.quoteObject){
                local.db.quoteObject=function(insaneName){
                    if(typeof insaneName!=="string"){
                        throw new Error("insaneName")
                    }
                    return JSON.stringify(insaneName);
                }
            }
            if(!local.db.quoteObjectList){
                local.db.quoteObjectList = function quoteObjectList(ObjectList){
                    return ObjectList.map(function(objectName){ return local.db.quoteObject(objectName); }).join(',');
                };
            }
            if(opts.verbose){
                console.log('db-connected',changing(local.config.db,{password:undefined},changing.options({deletingValue:undefined})),new Date() - startTS);
            }
            return client;
        });
    });
}

module.exports = sqlTools;
