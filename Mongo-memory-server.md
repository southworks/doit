# Mongodb-memory-server package
This package spins up a actual/real MongoDB Server programmatically from node for testing or mocking during development. By default it holds the data in memory. 
The server will allow you to connect your favorite ODM or client library to the MongoDB Server and run integration tests isolated from each other.

## Configuration
1. Install npm package

    ```
    npm install mongodb-memory-server --save-dev
    ```
2. Update Jest configuration in package.json.
The following line should be added in the "scripts" section of the file.

    ``
    "test": "jest --runInBand ./test"
    ``

3. Create a database handler file
This file will declare the events that will be call during the Jest testing life cycle.

    ```
    const mongoose = require('mongoose');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongodb = new MongoMemoryServer();

    /**
     * Connect to the in-memory database.
     */
    module.exports.connect = async () => {
        const uri = await mongodb.getConnectionString();
    
        const mongooseOpts = {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        };
    await mongoose.connect(uri, mongooseOpts);
    }
    
    /**
     * Drop database, close the connection and stop mongodb.
     */
    module.exports.closeDatabase = async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongodb.stop();
    }
    
    /**
     * Remove all the data for all db collections.
     */
    module.exports.clearDatabase = async () => {
        const collections = mongoose.connection.collections;
    
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
    
    /**
     * If you´re using Fastify please add the following lines.
     * These lines will create an instance of Fastify server for testing.
     */
    const fastify = require('fastify')({ logger: false });
    const port = 8000;
    const routes = require('../routes/task.routes');
    
    module.exports.start = async () => {
        try {
            await fastify.listen(port);
            fastify.log.info(`server listening on ${fastify.server.address().port}`);
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
    
    routes.forEach((route, index)=> {
        fastify.route(route);
    })
    
    module.exports.close = () =>{
        fastify.close();
    }
    
    module.exports.fs = fastify
    ```

4. You can create a seed file to fill the database with initial information.
Please use the following example as reference:
    ````
    const taskModel = require("../model/task.model");

    const createProducts = async () => {
       for(const item of items){
            await taskModel.create(item);
       }
    };
    
    module.exports = createProducts;
    
    /*DATA*/
    const items = [
    	{
    		name: "Hacer asado",
    		is_completed: false,
    		created_at: "2020-04-20T15:27:16.181Z",
    		deleted: true, 
    	},
    	{
    		name: "comprar fernet",
    		is_completed: false,
    		created_at: "2020-04-20T15:27:16.181Z",
    		deleted: false,
    	},
    ]
    ````
6. The last step will be to import Database handler functions and database seed functions in our test file, so we can trigger them during Jest life cycle events.
    ```
    "use strict";
    
    /* Import database handler function */
    const dbHandler = require('./db-handler');
    
    /* Import seed functions */
    const createProducts = require('./seed');
    
    /* Import moongose model */
    const taskModel = require("../model/task.model");
    
    /* Connect to a new in-memory database before running any tests. */
    beforeAll(async () => {
        await dbHandler.start();
        await dbHandler.connect();
    });
    
    /* Seed the database. */
    beforeEach(async () => {
        await createProducts();
    });
    
    /* Clear all test data after every test. */
    afterEach(async () => await dbHandler.clearDatabase());
    
    /* Remove and close the db and server. */
    afterAll(async () => {
        await dbHandler.closeDatabase();
        dbHandler.close();
    });
    
    describe("test", () => {
        [Add your tests]
    });
    ```


## More details
* The purpose of this document is to give a brief explanation about how to configure Mongo-memory-server with Fastify.
* There´re multiple options that can be configured in Mongo-memory-server. Such as, environment variables, platform and behaviors.
* For additional information you can take a look on Mongo-memory-server GitHub repository 
https://github.com/nodkz/mongodb-memory-server