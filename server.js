// MESH server.js

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// const { Server } = require('node:http');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// SESSIONS: install "express-session" and set up to be used in this following object here. In general it is called an "options object" that specifies your choices of functionality for NPM packages. Or to pass a specific piece of code, to a specific user, etc. NPM packages receives only objects so it is in object format.

const sess = {
  // secret is random and needs to be different from app to app. It makes the session more secure.
  secret: 'Mesh has secrets',
  cookie: {},
  // Typically false
  resave: false,
  // set to true because we want to save it even before the user has not logged in to check the login status is true or false. 
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// session here refers to the express-session package and it commands express app to use the object we created above:
app.use(session(sess));

// Inform Express.js on which template engine to use : HANDLEBARS
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
