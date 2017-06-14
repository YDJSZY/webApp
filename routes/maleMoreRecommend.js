/**
 * Created by luwenwei on 17/5/7.
 */
var express = require('express');
var maleMoreRecommend = function (req, res, next) {
    var response = res,db = req.db;
    var results = {};
    var page = parseInt(req.query.page);
    var page_size = parseInt(req.query.page_size) || 10;
    var collection = db.get('maleMoreRecommend');
    collection.find({},{skip:page*2-2,limit:page_size},function (e,docs){
        results.page = page;
        results.count = docs.length;
        results.results = docs;
        response.send(results)
    });
}

module.exports = maleMoreRecommend