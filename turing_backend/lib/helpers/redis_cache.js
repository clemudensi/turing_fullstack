const RedisClustr = require('redis-clustr');
const RedisClient = require('redis');

const client = new RedisClustr({

  servers: [
    {

      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT

    }
  ],

  createClient: function (port, host) {
    return RedisClient.createClient(port, host);

  }

});

client.on('connect', ()=>console.log('Redis connected'));

const midWare = (req, res, next) => {
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

module.exports = midWare;
