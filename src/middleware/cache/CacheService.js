'use strict';

var redis = require('../../drivers/database/redis/RedisClient'),
  p = console.log,
  e = console.error;

// redis
const MASTER_KEY = "master";
const MASTER_FIELD_UPDATED_AT = "updated_at";
const SUBMISSION_KEY = "submission";
const SUBMISSION_FIELD_COUNT = "count";

var cacheObj = (function() {
  var obj = {};
  return function (i) {
    return obj;
  }
})();

exports.init = function (){

}

exports.masterData = cacheObj
