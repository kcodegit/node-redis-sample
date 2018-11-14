'use strict';

var restify = require('restify'),
  Promise = require('bluebird'),
  router = require('../routes/router'),
  p = console.log,
  e = console.error;

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


exports.launch = () => {
  Promise.resolve(restify.createServer())
  .then(server => router.applyRoutes(server))
   .then(server => _listen(server))
   .catch(e => e('Error while launching a server.', e))
}