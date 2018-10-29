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

var getClient = () => {
  var _c = redis.createClient(REDIS_CONF);
  _c.on('ready', () => p('redis is ready'));
  _c.on('connect', () => p('redis is connected'));
  _c.on('reconnecting', () => p('redis is reconnecting'));
  _c.on('error', (err) => e('redis error', err));
  _c.on('end', (err) => e('redis connection ended', err));
  return _c
}

// main connection
var main_client = getClient();

/**
 * Redis Client
 */
class RedisClient{
  constructor(client){
    this.client = client;
  }

  /**
   * @returns { Promise<RedisClient||null> }
   */
  static getInstance(){
    return Promise.resolve((main_client && main_client.connected) ? new RedisClient(main_client) : null);
  }

  /**
   * called only when the server launches
   */
  init(){
    return this.hSetNX(MASTER_UPDATE_KEY, MASTER_UPDATE_FIELD, MASTER_UPDATE_VAL)
      .then(_ => this.updateCnt())
  }

  isConnected(){
    return !this.client ? false : this.client.connected;
  }

  hSet(key, field, value){
    return new Promise((res, rej)=>{
      this.client.hset(key, field, value, function(err, code){
        return err ? rej(err) : res(code);
      })
    })
  }

  hSetNX(key, field, value){
    return new Promise((res, rej)=>{
      this.client.hsetnx(key, field, value, (err, code)=>{
        return err ? rej(err) : res(code);
      })
    })
  }

  hmSet(key, arr){
    return new Promise((res, rej)=>{
      this.client.hmset(key, arr, (err, code)=>{
        return err ? rej(err) : res(code);
      })
    })
  }

  hGet(key, field){
    return new Promise((res,rej)=> {
      this.client.hget(key, field, (err, data)=>{
        return err ? rej(err) : res(data);
      })
    })
  }

  hGetAll(key){
    return new Promise((res,rej)=> {
      this.client.hgetall(key, (err, data)=>{
        return err ? rej(err) : res(data);
      })
    })
  }

  hIncreBy(key, field, increment){
    return new Promise((res,rej) => {
      this.client.hincrby(key, field, increment, (err, count)=>{
        return err ? rej(err) : res(count);
      })
    })
  }

  /**
   * end cleanly.
   * @returns { Promise }
   */
  quit(){
    return new Promise((res,rej) => {
      this.client.quit((err, status) =>{
        return err ? rej(err) : res(status);
      })
    })
  }
}


module.exports = RedisClient;
