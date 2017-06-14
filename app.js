var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require("mongodb");
var monk = require('monk');
var db = monk('localhost:27017/novel'); //创建一个数据库连接
var routes = require('./routes/index');
var maleNovelRecommend = require('./routes/maleNovelRecommend');
var femaleNovelRecommend = require('./routes/femaleNovelRecommend');
var femaleBestRecommend = require('./routes/femaleBestRecommend');
var maleBestRecommend = require('./routes/maleBestRecommend');
var editorRecommend = require("./routes/editorRecommend");
var femaleFreeNovels = require("./routes/femaleFreeNovels");
var maleFreeNovels = require("./routes/maleFreeNovels");
var classify = require("./routes/classify");
var hotSearch = require("./routes/hotSearch");
var maleMoreRecommend = require("./routes/maleMoreRecommend");
var users = require('./routes/users');
/*var users = require('./route/users');
var register = require("./route/register");
var login = require("./route/login");
var myinfo = require("./route/myinfo");*/

var app = express();

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  console.log("数据库已打开啦")
 
});

// view engine setup
//app.set('views', path.join(__dirname, 'public/output'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/output')));
app.use(function(req,res,next){
  next();
})
app.use(function(req,res,next){
  req.db = db;
  next();
})
app.use(function(req, res, next) {
  /*var err = new Error('Not Found');
  err.status = 404;*/
  next();
});
app.param("id", function(req, res, next, id){
  console.log("id:"+id);
  next();
})
app.use('/', routes);
app.use('/male_novel_recommend', maleNovelRecommend);
app.use('/femaleNovelRecommend', femaleNovelRecommend);
app.use('/male_best_recommend', maleBestRecommend);
app.use('/femaleBestRecommend', femaleBestRecommend);
app.use('/editor_recommend',editorRecommend);
app.use('/classify',classify);
app.use('/female_free_novels',femaleFreeNovels);
app.use('/male_free_novels',maleFreeNovels);
app.use('/hot_search',hotSearch);
app.use('/male_more_recommend',maleMoreRecommend);
/*app.use('/users/:id', users);
app.use('/login', login);
app.use('/register', register);
app.use('/myinfo', myinfo);*/
// catch 404 and forward to error handler

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    next()
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  next()
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
