const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.EXERCISE_TRACKER_MONGODB_CONNECTION_STRING, { useNewUrlParser: true })

module.exports = connection;