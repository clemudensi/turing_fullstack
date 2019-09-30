let cache = require('memory-cache');
const flatCache = require('flat-cache');
const Memcached = require('memcached');
let memcached = new Memcached('127.0.0.1:11211');
const redis = require('redis');
const client = redis.createClient();
let memCache = new cache.Cache();


let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key =  '__express__' + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if(cacheContent){
      res.send( cacheContent );
    }else{
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key,body,duration*1000);
        res.sendResponse(body)
      };
      next()
    }
  }
};

let flatCacheMiddleware = (req,res, next) => {
  const cache = flatCache.load('productsCache');
  let key =  '__express__' + req.originalUrl || req.url;
  let cacheContent = cache.getKey(key);
  if( cacheContent){
    res.send( cacheContent );
  }else{
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.setKey(key,body);
      cache.save();
      res.sendResponse(body)
    };
    next()
  }
};

let memcachedMiddleware = (duration) => {
  return  (req,res,next) => {
    let key = "__express__" + req.originalUrl || req.url;
    memcached.get(key, (err,data) => {
      if(data){
        res.send(data);
      }else{
        res.sendResponse = res.send;
        res.send = (body) => {
          memcached.set(key, body, (duration*60), (err, data) => {
            if(err) return err;
            return data
          });
          res.sendResponse(body);
        };
        next();
      }
    });
  }
};


// create redis middleware
let redisMiddleware = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  client.get(key, (err, reply) => {
    if(reply){
      res.send(reply);
    }else{
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(JSON.parse(body));
      };
      next();
    }
  });
};


module.exports = {
  cacheMiddleware,
  flatCacheMiddleware,
  memcachedMiddleware,
  redisMiddleware
};