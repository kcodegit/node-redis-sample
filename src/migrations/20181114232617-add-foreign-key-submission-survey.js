'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.addForeignKey('submission', 'survey', 'submission_survey_id_foreign', {
    'survey_id': 'survey_id'
  },  
  {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

exports.down = function(db, callback) {
  return db.removeForeignKey('submission', 'submission_survey_id_foreign');
};

exports._meta = {
  "version": 1
};
