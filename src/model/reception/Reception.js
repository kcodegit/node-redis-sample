'use strict';

var p = console.log,
  schema = require('../schema/schema.js'),
  errs = require('restify-errors'),
  redis = require('../../drivers/database/redis/RedisClient'),
  Submission = require('../submission/Submission'),
  SurveyRepository = require('../survey/SurveyRepository');

const REDIS_KEY = 'submission:count'
const REDIS_FIELD_KEY = 'survey_id:'

class Reception {
  /**
   * @param { Object } obj
   * @returns { Promise }
   */
  static receiveSubmission(obj){
    return schema.inspectRequest(schema.post_submission, obj, 'Reception')
      .then(_ => SurveyRepository.findById(obj.survey_id))
      .then(arr => arr.length ? new Submission(0, obj.survey_id, obj.opinion, obj.gender, obj.age)
        : Promise.reject(new errs.BadRequestError("Invalid survey id.")))
      .then(sub => sub.submit())
      .then(_ => incrRedis(obj.survey_id))
      .then(_ => getCount(obj.survey_id))
  }
}

function incrRedis(survey_id){
  return redis.hIncreBy(REDIS_KEY, REDIS_FIELD_KEY+survey_id, 1)
}

function getCount(survey_id){
  return redis.hGet(REDIS_KEY, REDIS_FIELD_KEY+survey_id)
}


module.exports = Reception
