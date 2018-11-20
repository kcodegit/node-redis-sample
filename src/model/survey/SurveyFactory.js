'use strict';

// imports
var Survey = require('./Survey'),
  schema = require('../schema/schema'),
  p = console.log;

exports.getInstanceFromDBResult = function(obj){
  schema.inspect(schema.survey, obj, 'SurveyFactory');
  return Object.freeze(
    new Survey(
      obj.survey_id,
      obj.survey_name,
      obj.created_at,
      obj.updated_at
    ));
}
