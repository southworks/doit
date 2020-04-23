const client = require('./client');

console.log(client.getTasks((response) =>{
    console.log(response.data);
    console.log(response.status);
}));