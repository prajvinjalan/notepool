#!/usr/bin/env node
'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _reduxSocket = require('redux-socket.io-connect');

var _handlers = require('../server/handlers');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Module dependencies.
 */

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  (0, _debug2.default)('notepool:server')('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3010');
_app2.default.set('port', port);

/**
 * Create HTTP server.
 */

var server = (0, _http.createServer)(_app2.default);

/**
 * Create Socket.io connection
 */

var socket = (0, _socket2.default)(server);
(0, _reduxSocket.createServer)(socket, _handlers2.default);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);