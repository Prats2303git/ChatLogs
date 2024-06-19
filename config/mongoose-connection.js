const mongoose = require("mongoose");
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/chathelp`)
.then(() => {
    console.log("connected");
})
.catch((err) => {
    console.log(err.message);
})
module.exports = mongoose.connection;
