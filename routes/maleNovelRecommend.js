/**
 * Created by luwenwei on 17/4/4.
 */
var express = require('express');
var novelRecommend = function (req, res, next) {
    var response = res,db = req.db;
    var results = {}
    var collection = db.get('maleNovelRecommend');
    collection.find({},function (e,docs){
        results.count = docs.length;
        results.results = docs;
        response.send(results)
    });
}

module.exports = novelRecommend