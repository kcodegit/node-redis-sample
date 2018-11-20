'use strict';

var restify = require('restify'),
  Promise = require('bluebird'),
  router = require('../routes/router'),
  error_handler = require('../middleware/request/error'),
  p = console.log;

/**
 * set restify plugins on the server
 * @param { Server } sv 
 * @return { Server }
 */
var _setPlugins = sv => { p('server setPlugins')
  sv.use(restify.plugins.jsonBodyParser());
  return sv;
}

/**
 * set port and uri on the server, start listening
 * @param { Server } sv 
 * @return { Server }
 */
var _listen = sv => {
  sv.listen(8080, function() {
    p('server listening at ', sv.url);
  });
  return sv;
}


exports.launch = _ => {
  Promise.resolve(restify.createServer())
    .then(server => router.applyRoutes(server))
    .then(server => error_handler.apply(server))
    .then(server => _setPlugins(server))
    .then(server => _listen(server))
    .catch(err => console.error('Error while launching a server.', err))
}