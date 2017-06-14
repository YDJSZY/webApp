/**
 * Created by luwenwei on 17/4/25.
 */
var express = require('express');
var hotSearch = function (req, res, next) {
    var response = res,db = req.db;
    var results = {}
    var collection = db.get('hotSearch');
    collection.find({},function (e,docs){
        results.count = docs.length;
        results.results = docs;
        response.send(results)
    });
}

module.exports = hotSearch