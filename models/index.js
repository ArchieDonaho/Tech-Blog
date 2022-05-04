// import the models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// define user/post associations (one-to-many)
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// define comment associations (one-to-many)
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
