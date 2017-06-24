var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('./db/MongoDB');
var cookieParser = require('cookie-parser');

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var tutorial = require('./routes/tutorial');
var logout = require('./routes/logout');
var news = require('./routes/news');
var questionarios = require('./routes/questionarios');
var pacientes = require('./routes/pacientes');
var agenda = require('./routes/agenda');

var app = express();

mongo.db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'session_manager',  resave: false, saveUninitialized:true,  cookie: { secure: true }}));
app.use(cookieParser());
var session;

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/usuarios', users);
app.use('/login', login);
app.use('/tutorial', tutorial);
app.use('/logout', logout);
app.use('/news', news);
app.use('/questionarios', questionarios);
app.use('/pacientes', pacientes);
app.use('/agendamentos', agenda);
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
