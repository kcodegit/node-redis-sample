'use strict';

var p = console.log;

/**
 * handles the routing
 * @param { RestifyServer } server 
 */
exports.applyRoutes = server => {
  server.get('/', (req, res, next) => { 
    res.send(200, { msg: 'hello redis' })
    next()
  })
  return server
}
