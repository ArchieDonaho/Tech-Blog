const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbdbUserData) => res.json(dbdbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: {
      id: req.params.id,
    },
    // include: [{}, {}, {}],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST a new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // //access the session information
      // req.session.save(() => {
      //   req.session.user_id = dbdbUserData.id;
      //   req.session.username = dbdbUserData.username;
      //   req.session.loggedIn = true;

      //   res.json(dbdbUserData);
      // });
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
