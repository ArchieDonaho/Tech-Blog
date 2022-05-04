const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// render the homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'user_id', 'content', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      // serialize the data and send it to the homepage
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        // loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render the single post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'user_id', 'content', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize the data and send it to the sinple post page
      const post = dbPostData.get({ plain: true });
      res.render('single-post', {
        post,
        // loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render the login page if the user is not logged in
router.get('/login', (req, res) => {
  // if (!req.session.loggedIn) {
  res.render('login');
  // }
});

// render the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
