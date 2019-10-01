const redis = require('redis'),
  client = redis.createClient({host : 'localhost', port : 6379});
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

// const elasticache = new AWS.ElastiCache();
// const midWare = elasticache.addTagsToResource(function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

module.exports = midWare;
