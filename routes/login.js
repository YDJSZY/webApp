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
router.post('/', function(req, res, next) {
    var db = req.db;
    var PersonModel = db.model('users',PersonSchema);
    var personEntity = new PersonModel({username:req.body.username,"password":req.body.password});
    personEntity.save(function (err,docs) {
        res.cookie("userInfo",{"username":docs.username,"password":docs.password,"uid":docs._id},{'maxAge':30000})
        res.send(docs);
        db.close();
    });
})

module.exports = router;