require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser');
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}))

app.use(bodyparser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
// });

app.use('/exercise-tracker', require('./exercise-tracker/routes'))

app.use('/header-parser', require('./header-parser/routes'))

app.use('/timestamp-microservice', require('./timestamp-microservice/routes'))

app.use('/url-shortner', require('./url-shortner/routes'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
