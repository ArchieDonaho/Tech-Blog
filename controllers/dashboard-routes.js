const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// render the dashboard with all the user's posts
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
    // serialize data before passing to template
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// display page to edit a post

module.exports = router;
