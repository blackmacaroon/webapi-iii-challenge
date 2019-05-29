// const express = require('express');

const User = require('./userDb');

const router = require('express').Router();


router.get('/', (req, res) => {
      
      User.get()
      .then(users => {
            res.status(200).json({ users });
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get users from database'})
      })
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
      const { postId } = req.params.id;
      if (!postId) {
            res.status(400).json({ message: "invalid user id" })
      } else {
            res.status(200).json( req.user )
            next()
      }

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
