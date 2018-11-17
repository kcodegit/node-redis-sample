'use strict';

var inspector = require('schema-inspector'),
  errs = require('restify-errors'),
  Promise = require('bluebird'),
  p = console.log;

const obj_schema = { type: 'object', error: 'must be object' };
const datetime_regex = /^20[0-9]{2}[-\/]((0[1-9]{1})|(1[0-2]{1}))[-\/]((0[1-9]{1})|([1-2]{1}[0-9]{1})|(3{1}[0-1]{1}))\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

exports.survey = {
  type: 'object',
  strict: true,
  properties: {
    survey_id:   { type: 'number', error: 'must be number' },
    survey_name: { type: 'string', error: 'must be string' },
    start_at:      { type: 'string', error: 'must be string' },
    end_at:        { type: 'string', error: 'must be string' }
  }
}

/**
 * inspects the schema of given object.
 * @param { object } schema 
 * @param { object } obj 
 * @param { string } tag
 * @return { object }
 * @throws { InternalServerError }
 */
exports.inspect = function (schema, obj, tag) {
  var r = inspector.validate(schema, obj)
  if (!r.valid) throw new errs.InternalServerError({ message: tag + " => Invalid Schema " + JSON.stringify(r.error, null, 2) });
  else return r;
}

/**
 * inspects the schema of given object. Promised
 * @param { object } schema 
 * @param { object } obj 
 * @param { string } msg
 * @return { Promise }
 * @throws { Promise<BadRequestError> }
 */
exports.inspectRequest = function (schema, obj, msg = '') {
  return new Promise((res, rej) => {
    return inspector.validate(schema, obj).valid ? res() : rej(new errs.BadRequestError({ message: 'Invalid Body. ' + msg }));
  })
}

/**
 * @param { object } schema 
 * @param { object } obj 
 * @return { boolean } result
 */
exports.check = (schema, obj) => inspector.validate(schema, obj).valid;