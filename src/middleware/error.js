'use strict';

var errs = require('restify-errors'),
  p = console.log,
  e = console.error;

/**
 * 
 * @param { Server } server 
 */
exports.apply = server => {
  server.on('NotFound', _handler.notFound);
  server.on('InternalServer', _handler.internalServer);
  server.on('restifyError', _handler.default);
  return server
}


var _handler = {
  notFound: (req, res, err, cb) => {
    err.message = "We don't have what you want.";
    return cb();
  },
  internalServer: (req, res, err, cb) => {
    err.message = 'Something terrible happend in the server...';
    return cb()
  },
  default: (req, res, err, cb) => {
    p(err);
    err.toJSON = _ => {
      // this is for expected errors
      if(errs.hasOwnProperty(err.name)) return { msg: err.message }
      // this is unexpected errors such as ReferenceError, TypeError, any bug in the system
      return { msg: 'Something FATAL happened in the server!!!' }
    };
    return cb()
  }
}
