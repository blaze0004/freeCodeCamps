const express = require('express');
const cors = require('cors');
const path = require('path');

const headerParserRouter = express.Router();

headerParserRouter.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
headerParserRouter.use(express.static(path.resolve(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
headerParserRouter.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

// your first API endpoint... 
headerParserRouter.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

headerParserRouter.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  })
})


module.exports = headerParserRouter;