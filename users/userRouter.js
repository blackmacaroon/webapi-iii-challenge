const express = 'express';

const User = require('./userDb');

const router = express.Router();


router.get('/', (req, res) => {
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
});

router.post('/', (req, res) => {      

});

router.post('/:id/posts', (req, res) => {

});


router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
