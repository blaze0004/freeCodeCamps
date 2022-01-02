require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');
const URL = require('url')
const app = express();
const path = require('path')

// Basic Configuration
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

mongoose.connect(process.env['MONGODB_CONNECTION_STRING'], { useNewUrlParser: true })

const shortedUrlsSchema = new mongoose.Schema({
  url: String
})

const ShortedURLS = mongoose.model('shorted_urls', shortedUrlsSchema)

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const { body: { url } } = req;

  const getHostName = (urlString) => {
    const hasProtocol = urlString.includes('//');
    let hostname = urlString;

    if (hasProtocol) {
      hostname = urlString.split('//')[1];
    } 

    const hasPathname = hostname.includes('/');

    if (hasPathname) {
      hostname = hostname.split('/')[0];
    }

    return hostname;
  }

  dns.lookup(getHostName(url), (err, address) => {
    if (err) {
      console.log(err.message)
          res.json({
            error: "invalid url"
          })
    } else {
      ShortedURLS.create({ url }, (err, data) => {
        if (err) {
          console.log(err.message)
          res.json({
            error: "invalid url"
          })
        } else {
          res.json({
            original_url: url, short_url: data._id
          })
        }
      })
    }
  })
})

app.get('/api/shorturl/:id', (req, res) => {
  ShortedURLS.findById(req.params.id, (err, data) => {
    if (err) {
      res.json({
        error: "invalid Url"
      })
    } else {
      res.redirect(data.url);
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
