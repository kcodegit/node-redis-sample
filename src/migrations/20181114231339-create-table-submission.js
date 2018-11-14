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
  return db.createTable('submission', {
    submission_id: {
      type: 'bigint',
      primaryKey: true,
      autoIncrement: true,
      unsigned:true,
      notNull:true
    },
    survey_id: {
      type: 'int',
      unsigned:true,
      notNull:true
    },
    opinion: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    gender: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    age: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    submitted_at: {
      type:'timestamp',
      notNull:true,
      defaultValue:'CURRENT_TIMESTAMP'
    }
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('submission', {

  }, callback);
};

exports._meta = {
  "version": 1
};
