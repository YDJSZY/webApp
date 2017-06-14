/**
 * Created by luwenwei on 17/4/23.
 */
var express = require('express');
var femaleFreeNovels = function (req, res, next) {
    var response = res,db = req.db;
    var results = {}
    var collection = db.get('femaleFreeNovels');
    collection.find({},function (e,docs){
        results.count = docs.length;
        results.results = docs;
        response.send(results)
    });
}

module.exports = femaleFreeNovels