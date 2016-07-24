var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require("fs");

fs.readFile("foo.txt", "utf8", function(error, data) {
  console.log(data);
});

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var adminLogin = require('./routes/adminLogin');
var vendorGetandInsert = require('./routes/vendorGetandInsert');
var productsGetandInsert = require('./routes/productsGetandInsert');
var editProduct = require('./routes/editProduct');
var deleteProduct = require('./routes/deleteProduct');
var editVendor = require('./routes/vendorEdit');
var userProducts = require('./routes/UserProductsGet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', routes);
app.use('/users', users);
app.listen(8081,function(){
  console.log("BlueLounge is listen at Localhost port:8081");
});
app.use('/signup',signup);
app.use('/login',login);
app.use('/adminLogin',adminLogin);
app.use('/vendor',vendorGetandInsert);
app.use('/products',productsGetandInsert);
app.use('/editproduct',editProduct);
app.use('/deleteproduct',deleteProduct);
app.use('/editvendor',editVendor);
app.use('/userProducts',userProducts);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
