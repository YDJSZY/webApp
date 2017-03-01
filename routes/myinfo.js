/**
 * Created by luwenwei on 16/8/7.
 */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
    username:String,   //定义一个属性name，类型为String
    password:String
});

router.use(function(req, res, next){
    next()
})
router.get('/', function(req, res, next) {
    if(!req.cookies.userInfo) {
        res.end("");
    }else{
        console.log(req.cookies);
        var db = req.db;
        var PersonModel = db.model('users',PersonSchema);
        //var personEntity = new PersonModel();
        PersonModel.find({"_id":req.cookies.userInfo.uid},function (err,docs) {
            res.send(docs);
            db.close();
        });
    }
})
//};

module.exports = router;