'use strict';

// imports and vars
var redis = require('redis'),
  p = console.log,
  e = console.error;

// redis config
const REDIS_CONF = { 
  host: "127.0.0.1",
  port: 6379,
  retry_strategy: function(opts){
    if(opts.error && opts.error.code === 'ECONNREFUSED'){ 
      return new Error('The server refused the connection' + opts.error);
    }
    if (options.attempt > 10) {
      return new Error('The retry count exhausted.');
    }
    return 3000;
  }
}

var main_client = getClient()

// main connection
function getClient(){ 
  var client = redis.createClient(REDIS_CONF);
  client.on('connect', () => p('redis is connected'));
  client.on('ready', () => p('redis is ready'));
  client.on('reconnecting', () => p('redis is reconnecting'));
  client.on('error', (err) => {
    e('redis error', err);
    main_client = getClient();
  });
  client.on('end', (err) => {
    e('redis connection ended', err);
    main_client = getClient();
  });
  return client
}


exports.isConnected = () => {
  return !main_client ? false : main_client.connected;
}

exports.hSet = (key, field, value) => {
  return new Promise((res, rej)=>{
    main_client.hset(key, field, value, function(err, code){
      return err ? rej(err) : res(code);
    })
  })
}

exports.hSetNX = (key, field, value) => {
  return new Promise((res, rej)=>{
    main_client.hsetnx(key, field, value, (err, code)=>{
      return err ? rej(err) : res(code);
    })
  })
}

exports.hmSet = (key, arr) => {
  return new Promise((res, rej)=>{
    main_client.hmset(key, arr, (err, code)=>{
      return err ? rej(err) : res(code);
    })
  })
}

exports.hGet = (key, field) => {
  return new Promise((res,rej)=> {
    main_client.hget(key, field, (err, data)=>{
      return err ? rej(err) : res(data);
    })
  })
}

exports.hGetAll = (key) => {
  return new Promise((res,rej)=> {
    main_client.hgetall(key, (err, data)=>{
      return err ? rej(err) : res(data);
    })
  })
}

exports.hIncreBy = (key, field, increment) => {
  return new Promise((res,rej) => {
    main_client.hincrby(key, field, increment, (err, count)=>{
      return err ? rej(err) : res(count);
    })
  })
}

/**
 * end cleanly.
 * @returns { Promise }
 */
exports.quit = () => {
  return new Promise((res,rej) => {
    main_client.quit((err, status) =>{
      return err ? rej(err) : res(status);
    })
  })
}
