var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next){
  next()
})
router.get('/', function(req, res, next) {
  console.log(9999)
  res.render('index', { title: 'Express' });
});

module.exports = router;
