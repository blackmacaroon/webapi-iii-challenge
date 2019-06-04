// const express = require('express');

const Post = require('./postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
 
      Post.get()
      .then(posts => {
            res.status(200).json(posts);
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

async function validatePostId(req, res, next) {
      // const post = await Post.getById(req.params.id);
      // if (post) {
      //       res.status(200).json(req.body)
      //       next()
      // } else {
      //       res.status(404).json({ message: "invalid post id" })
      // }
};

module.exports = router;