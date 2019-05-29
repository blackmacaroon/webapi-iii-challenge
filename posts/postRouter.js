const express = 'express';

const Post = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;