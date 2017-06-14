/**
 * Created by luwenwei on 17/4/17.
 */
var express = require('express');
var novel = function (req, res, next) {
    var response = res,db = req.db;
    var results = {}
    var collection = db.get('classify');
    collection.find({},function (e,docs){
        results.results = docs;
        response.send(results)
    });
}

module.exports = novel