// const express = require('express');

const User = require('./userDb');

const router = require('express').Router();

// get list of users ITS WORKING
router.get('/', (req, res) => {
      
      User.get()
      .then(users => {
            res.status(200).json(users);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get users from database'});
      })
});

// create new user ITS WORKING
router.post('/', validateUser, (req, res) => {      
      User.insert(req.body)
      .then(user => {
            res.status(201).json(user);
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new user to database'});
      })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
      const post = req.body;
      // console.log(req.body);
      const id = req.params.id;
      post.user_id = id;
      
      User.insert(post)
      .then( post => {
            res.status(201).json(post);
            // 201 CREATED
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error creating a post' });
      })
});


//get user through middleware with id ITS WORKING
router.get('/:id', validateUserId, (req, res) => {
      User.getById(req.params.id)
      .then(user => {
            res.status(200).json(user);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get user from database'});
      })
});
 //get posts from specific user id ITS WORKING
router.get('/:id/posts', validateUserId, async (req, res) => {
      try {
            const id = User.getById(req.params.user_id);
            if (!id) {
                  res.status(404).json({ message: 'Sorry, no posts exist with that ID'});
            } else {
                  const posts = await User.getUserPosts(req.params.id);
                  res.status(200).json(posts)
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting posts for that ID'});
      }
});

// remove user ITS WORKING
router.delete('/:id', async (req, res) => {
      try {
            const count = await User.remove(req.params.id);
            if (count > 0) {
                  res.status(200).json({ message: 'This user no longer exists.'});
            } else {
                  res.status(404).json({ message: 'That user could not be found'});
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error removing user' });
      }
});

// edit user ITS WORKING
router.put('/:id', async (req, res) => {
      try {
            const user = await User.update(req.params.id, req.body);
            if (user) {
                  res.status(200).json(user);
            } else {
                  res.status(404).json({ message: 'That user could not be found' });
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating the user' });
      }
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

function validateUser(req, res, next) {
      if(!req.body) {
            res.status(400).json({ message: 'missing user data' })
      } else if (!req.body.name) {
            res.status(400).json({ message: 'missing required name field'})
      } else {
            next()
      }
};

function validatePost(req, res, next) {
      if(!req.body) {
            res.status(400).json({ message: 'missing post data' })
      } else if (!req.body.text) {
            res.status(400).json({ message: 'missing required text field'})
      } else {
            next()
      }
};

module.exports = router;
