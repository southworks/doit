const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
module.exports.connectDatabase = async () => {
    const uri = await mongodb.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongodb.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};


const fastify = require('fastify')({ logger: false });
const routes = require('../routes/task.routes');

module.exports.startFastify = async () => {
    try {
        await fastify.listen(process.env.PORT);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

routes.forEach((route, index)=> {
    fastify.route(route);
});

module.exports.closeFastify = () =>{
    fastify.close();
};

module.exports.fs = fastify;
