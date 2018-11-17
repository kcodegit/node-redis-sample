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
  return db.createTable('survey', {
    survey_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      unsigned:true,
      notNull:true
    },
    survey_name: {
      type: 'string',
      notNull: true,
      unique: true
    },
    created_at: {
      type:'timestamp',
      notNull:true,
      defaultValue:'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type:'timestamp',
      notNull:true,
      defaultValue:'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    }
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('survey', callback);
};

exports._meta = {
  "version": 1
};
