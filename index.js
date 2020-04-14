const fastify = require('fastify')({ logger: true });
const port = process.argv[2];
const routes = require('./routes/task.routes');


routes.forEach((route, index)=> {
    fastify.route(route);
})

const start = async () => {
    try {
        await fastify.listen(port);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();