const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      // attributes: { exclude: ['password'] },
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then((userData) => {
      // //access the session information
      // req.session.save(() => {
      //   req.session.user_id = dbUserData.id;
      //   req.session.username = dbUserData.username;
      //   req.session.loggedIn = true;

      //   res.json(dbUserData);
      // });
      res.json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
