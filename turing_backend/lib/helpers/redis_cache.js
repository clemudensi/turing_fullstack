const redis = require('redis'),
  client = redis.createClient();

client.on('connect', ()=>console.log('Redis connected'));

// const log = console;

const midWare = (req, res, next) => {
  const key = req.url;
  client.get(key, (err, result) => {
    if (err == null && result != null) {
      res.send(result)
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, body, (err, reply) => {
          if (reply === 'OK')
            res.sendResponse(body)
        })
      };
      next()
    }
  })
};

module.exports = midWare;
