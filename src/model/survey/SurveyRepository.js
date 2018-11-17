'use strict';

var Promise = require('bluebird'),
    DBC = require('../../drivers/database/mysql/DBClient'),
    SurveyFactory = require('./SurveyFactory'),
    p = console.log;

const DB_CONF = { 
  "host": "localhost", 
  "user": "root",
  "password": "password",
  "database": "survey_db",
  "port": 3306,
  "ssl": false,
  "connectTimeout": 1000
}

var mysql = DBC(DB_CONF, 'master')

exports.findAll = function() {
  var query = 'SELECT survey_id, survey_name, created_at, updated_at FROM survey';
  return mysql.query(query)
    .then(results => results.map(r => SurveyFactory.getInstanceFromDBResult(r)))
    .catch(e => Promise.reject(e));
}

exports.findById = function(survey_id) {                  
  var q = 'SELECT survey_id, survey_name, created_at, updated_at FROM survey WHERE survey_id = ?';
  var params = [survey_id];
  return mysql.execute(query, params)
    .then(results => results.map(r => SurveyFactory.getInstanceFromDBResult(r)))
    .catch(e => Promise.reject(e));
}

exports.findAllSortedByUpdatedAt = function(){
  var q = 'SELECT survey_id, survey_name, created_at, updated_at FROM survey ORDER BY updated_at LIMIT 1';
  return mysql.query(query)
    .then(results => results.map(r => SurveyFactory.getInstanceFromDBResult(r)))
    .catch(e => Promise.reject(e));
}
