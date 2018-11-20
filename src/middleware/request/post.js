'use strict';

var p = console.log,
  Reception = require('../../model/reception/Reception');

/**
 * submit a survey
 * @param { Request } req 
 * @param { Response } res
 * @param { callback } next 
 */
exports.submission = function (req, res, next) {
  return Reception.receiveSubmission(req.body)
    .then(count => res.send(200, { total_submission : count }))
    .catch(e => next(e));
}