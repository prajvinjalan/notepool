'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _database = require('./server/config/database');

var _database2 = _interopRequireDefault(_database);

var _api = require('./server/routes/api');

var _api2 = _interopRequireDefault(_api);

var _auth = require('./server/routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _passport3 = require('./server/config/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to DB
_mongoose2.default.connect(process.env.MONGODB_URI || _database2.default.database, {
  useMongoClient: true
});
var db = _mongoose2.default.connection;

// check connection
db.once('open', function () {
  console.log('Connected to MongoDB: ' + _database2.default.database);
});

// check for DB errors
db.on('error', function (err) {
  console.log('Connection to MongoDB failed' + err);
});

// initialize app
var app = (0, _express2.default)();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// Express Session Middleware
app.use((0, _expressSession2.default)({
  secret: 'notepoolsessionsecret',
  resave: true,
  saveUninitialized: true
}));

// Express Validator Middleware
app.use((0, _expressValidator2.default)({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config and Middleware

(0, _passport4.default)(_passport2.default);
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// Route files
app.use('/api', _api2.default);
app.use('/auth', _auth2.default);

app.get('*', function (req, res, next) {
  res.sendFile(_path2.default.resolve(__dirname, 'public', 'index.html'));
});

// Backend error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

exports.default = app;