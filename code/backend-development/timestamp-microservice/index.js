// server.js
// where your node app starts

// init project
var express = require('express');
const path = require('path');
const fs = require('fs');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html/**
app.use(express.static(path.resolve(__dirname, "public")));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

app.get('/api/:time', (req, res) => {
  const { time } = req.params;

  let unix, utc;
  let date;
  if (/^[0-9]+$/.test(time)) {
    date = new Date(Number.parseInt(time));
  } else {
    date = new Date(time);
  }

  unix = date.getTime();
  utc = date.toUTCString();
  
  if (!unix || !utc) {
    res.json({
      error: 'Invalid Date'
    });
    return;
  }

  res.json({
    unix, utc
  })
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    return res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
