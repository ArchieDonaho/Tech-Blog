// express/sql
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// sessions

// handlebars
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// create sessions object

// create handlebars object
const hbs = exphbs.create({
  // helpers
});

// set up sessions

// set handlebars as teh default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// link our routes
app.use(routes);

// connect to database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});
