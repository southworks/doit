const fastify = require('fastify')({ logger: true });
const routes = require('./routes/task.routes');
const mongoose = require('mongoose');
const Ajv = require('ajv');

const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    nullable: true
});

fastify.setSchemaCompiler(function (schema) {
    return ajv.compile(schema);
});

require('dotenv-safe').config();

// Import Swagger Options
const swagger = require('./config/swagger')

// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
useNewUrlParser: true
}).then(() => console.log("MongoDB connected…"))
.catch(err => console.log(err));

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

routes.forEach((route, index)=> {
    fastify.route(route);
})



const start = async () => {
    try {
        await fastify.listen(process.env.PORT);
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();

module.exports = fastify;
