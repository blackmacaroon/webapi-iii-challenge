// const express = require('express');

const User = require('./userDb');

const router = require('express').Router();


router.get('/', (req, res) => {
      
      User.get()
      .then(users => {
            res.status(200).json(users);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get users from database'});
      })
});

router.post('/', (req, res) => {      
      User.insert(req.body)
      .then(user => {
            res.status(201).json(user);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new user to database'});
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
            res.status(500).json({ error: 'could not get user from database'});
      })
});

router.get('/:id/posts', async (req, res) => {
      try {
            const id = User.getById(req.params.user_id)
            if (!id) {
                  res.status(404).json({ message: 'Sorry, no posts exist with that ID'})
            } else {
                  const posts = await User.getUserPosts(req.params.id);
                  res.status(200).json(posts)
            }
      } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error getting posts for that ID'})
      }
});

router.delete('/:id', async (req, res) => {
      try {
            const count = await User.remove(req.params.id)
            if (count > 0) {
                  res.status(200).json({ message: 'This user no longer exists.'});
            } else {
                  res.status(404).json({ message: 'That user could not be found'});
            }
      } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error removing user' });
      }
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
            res.status(400).json({ message: "invalid user id" })
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
