const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbconfig = require('./server/config/database');

// connect to DB
mongoose.connect(dbconfig.database, {
  useMongoClient: true
});
let db = mongoose.connection;

// check connection
db.once('open', function(){
  console.log('Connected to MongoDB: ' + dbconfig.database);
});

// check for DB errors
db.on('error', function(err){
  console.log('Connection to MongoDB failed' + err);
});

const api = require('./server/routes/api');

// initialize app
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.get('*', function(req, res, nex) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// error handler: FIX THIS
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

module.exports = app;
