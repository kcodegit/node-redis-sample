'use strict';

var Promise = require('bluebird'),
    DBC = require('../../drivers/database/mysql/DBClient'),
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

var mysql = new DBC(DB_CONF, 'master');

exports.add = function(survey_id, opinion, gender, age) {
  var query = 'INSERT INTO submission (survey_id, opinion, gender, age) VALUES (?, ?, ?, ?)';
  return mysql.execute(query, [survey_id, opinion, gender, age])
    .catch(e => Promise.reject(e));
}
