
const mongoose = require('mongoose');

const dbConnection = require('../db.connection');

const userSchema = new mongoose.Schema({
    username: String
})

exports.Users = dbConnection.model("users", userSchema);
