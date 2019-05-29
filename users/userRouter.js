// const express = require('express');

const User = require('./userDb');

const router = require('express').Router();


router.get('/', (req, res) => {
      
      User.get()
      .then(users => {
            res.status(200).json(users);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get users from database'})
      })
});

router.post('/', (req, res) => {      
      User.insert(req.body)
      .then(user => {
            res.status(201).json(user)
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new user to database'})
      })
});

router.post('/:id/posts', (req, res) => {

});


router.get('/:id', validateUserId, (req, res) => {
      User.getById(req.params.id)
      .then(user => {
            res.status(200).json(user);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get user from database'})
      })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
      const user = await User.getById(req.params.id)
      if (user) {
            // console.log('user', user)
            req.user = user
            next();
      } else {
            // console.log('user', user)
            res.status(404).json({ message: "invalid user id" })    
      }

};

async function validateUser(req, res, next) {
      const user = await User.get(req.body)
      if (user) {
            req.body
      }

};

function validatePost(req, res, next) {

};

module.exports = router;
