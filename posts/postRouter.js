// const express = require('express');

const Post = require('./postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
 
      Post.get()
      .then(posts => {
            res.status(200).json({ posts });
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get posts from database'})
      })

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
      const { postId } = req.params.id;
      if (!postId) {
            res.status(400).json({ message: "invalid user id" })
      } else {
            res.status(200).json( req.user )
            next()
      }
};

module.exports = router;