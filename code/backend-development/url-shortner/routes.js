const dns = require('dns');
const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const dbConnection = require('./db.connection');

const urlShortnerRouter = express.Router();

urlShortnerRouter.use(express.static(path.resolve(__dirname, 'public')))

const shortedUrlsSchema = new mongoose.Schema({
  url: String
})

const ShortedURLS = dbConnection.model('shorted_urls', shortedUrlsSchema)

urlShortnerRouter.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});


// Your first API endpoint
urlShortnerRouter.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

urlShortnerRouter.post('/api/shorturl', (req, res) => {
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

urlShortnerRouter.get('/api/shorturl/:id', (req, res) => {
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

module.exports = urlShortnerRouter
