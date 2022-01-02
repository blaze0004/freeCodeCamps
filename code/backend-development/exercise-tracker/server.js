const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./controllers/users.controller')

app.use(bodyparser.urlencoded({ extended: true }))

// Init Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

app.use('/api/users', usersRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
