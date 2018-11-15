'use strict';

var p = console.log,
  e = console.error;

/**
 * master data + count getter
 * @param { Request } req 
 * @param { Response } res
 * @param { callback } next 
 */
exports.survey = function (req, res, next) {
  try {
    p('survey handler');
    res.send(200, { msg: 'here is the master data' });
    next()
  } catch (err) {
    next(err)
  }

}