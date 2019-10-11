const redis = require('redis'),
  client = redis.createClient();
client.on('connect', ()=>console.log('Redis connected'));

const redisCache = (req, res, next) => {
  const key = req.url;
  client.get(key, (err, result) => {
    if (err == null && result != null) {
      res.send(JSON.parse(result))
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, body, (err, reply) => {
          if (reply === 'OK')
            res.sendResponse(JSON.parse(body))
        })
      };
      next()
    }
  })
};

module.exports = redisCache;
