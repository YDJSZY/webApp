/**
 * Created by luwenwei on 17/4/23.
 */
var maleFreeNovels = function (req, res, next) {
    var response = res,db = req.db;
    var results = {}
    var collection = db.get('maleFreeNovels');
    collection.find({},function (e,docs){
        results.count = docs.length;
        results.results = docs;
        response.send(results)
    });
}

module.exports = maleFreeNovels