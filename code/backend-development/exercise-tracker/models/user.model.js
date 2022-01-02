const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String
})


exports.Users = mongoose.model("users", userSchema);
