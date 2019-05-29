const express = require('express');
const helmet = require('helmet');

const postRouter = require('../posts/postRouter');
const userRouter = require('../users/userRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
//don't need to invoke logger b/c helmet and json are functions, logger is the ref to the function.
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

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
