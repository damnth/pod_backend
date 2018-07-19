var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertRouter_fam = require('./routes/insert/getFamily');
var insertRouter_infra = require('./routes/insert/getInfrastructure');
var insertRouter_locat = require('./routes/insert/getLocation');
var insertRouter_role = require('./routes/insert/getRole');
var finish = require('./routes/insert/finish');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert/getFamily', insertRouter_fam);
app.use('/insert/getInfrastructure', insertRouter_infra);
app.use('/insert/getLocation', insertRouter_locat);
app.use('/insert/getRole', insertRouter_role);
app.use('/insert/finish', finish);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
