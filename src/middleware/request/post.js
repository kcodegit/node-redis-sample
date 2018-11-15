'use strict';

var p = console.log,
  e = console.error;

/**
 * submit a survey
 * @param { Request } req 
 * @param { Response } res
 * @param { callback } next 
 */
exports.submission = function (req, res, next) {
  try {
    p('submission handler');
    res.send(200, { msg: 'accepted' });
    next();
  } catch (err) {
    next(err)
  }
}