const mongoose = require("mongoose");

// Connect to DB
// let connection_string = "";
// mongoose.connect(connection_string, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).catch(err => console.log(err));

//Create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

