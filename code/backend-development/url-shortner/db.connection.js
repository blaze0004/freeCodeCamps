const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.URL_SHORTNER_MONGODB_CONNECTION_STRING, { useNewUrlParser: true })

module.exports = connection;