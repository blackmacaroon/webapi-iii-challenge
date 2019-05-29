const express = require('express');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const d = new Date();
  const n = d.toJSON();
  console.log(`A ${req.method} request to '${req.originalUrl}' Timestamp: ${n}`)
};

module.exports = server;
