'use strict';

var get = require('../middleware/request/get'),
  post = require('../middleware/request/post'),
  p = console.log;

/**
 * handles the routing
 * @param { RestifyServer } server 
 */
exports.applyRoutes = server => {
  server.use((req, res, next) => {
    p('api hit at ', req.url);
    next();
  });
  server.get('/healthcheck', (req, res, next) => { 
    res.send(200, { msg: 'I am good thanks.' }); 
    next(); 
  });
  server.get('/survey', get.survey);
  server.post('/submission', post.submission);
  return server
}
