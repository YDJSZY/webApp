var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('blog');
  collection.find({"name":"YDJS"},function (e,docs){
    console.log("e"+e);
    res.send(docs);
  });
 /* collection.insert({"name":"ZY","age":"24"}).then(function (docs){
    console.log("insert:"+docs);
  });
  collection.update({"name":"ZY"},{$set:{"class":12}},{multi:true}).then(function (docs){
    console.log("update:"+docs)
  })*/
});

module.exports = router;
