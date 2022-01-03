const express = require('express');
const path = require('path');

const timestampMicroservice = express.Router();

// http://expressjs.com/en/starter/static-files.html/**
timestampMicroservice.use(express.static(path.resolve(__dirname, "public")));

// your first API endpoint... 
timestampMicroservice.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

timestampMicroservice.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

timestampMicroservice.get('/api/:time', (req, res) => {
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
timestampMicroservice.get("/", function (req, res) {
    return res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

module.exports = timestampMicroservice;