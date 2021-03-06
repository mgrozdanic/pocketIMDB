var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected!\n');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const deleteFromRedis = identifier => {
    console.log("\nDeleting '" + identifier + "'...\n");
    client.del(identifier);
}

const addToRedis = (identifier, value) => {
    console.log("\nAdding " + identifier + "...\n");
    client.set(identifier, value);
}

const redisMiddleware = (req, res, next) => {
    const identifier = req.params.page + "_" + req.params.flag;
    if (req.params.search !== 'All' || req.params.filter !== 'All') {
        next();
        return;
    }
    client.get(identifier, (err, data) => {
    if (err) throw err;

    if (data !== null) {
        console.log("Using values from redis.");
        res.send(JSON.parse(data));
    } else {
        next();
    }
    });
}

module.exports = {
    redisMiddleware,
    addToRedis,
    deleteFromRedis
}