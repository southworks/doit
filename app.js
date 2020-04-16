const fastify = require('fastify')({ logger: true });
const port = process.argv[2];
const routes = require('./routes/task.routes');
const mongoose = require('mongoose')

require('dotenv-safe').config();

// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
useNewUrlParser: true
}).then(() => console.log("MongoDB connected…"))
.catch(err => console.log(err));

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

module.exports = fastify;