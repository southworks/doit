const axios = require('axios').default;

module.exports.getTasks = (callback) => {
    axios
    .get('http://localhost/tasks')
    .then(callback);
}