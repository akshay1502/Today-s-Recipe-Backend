const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./mongo_conn');

const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');
const userRoute = require('./routes/users');

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(recipesRoute);
app.use(authRoute);
app.use(userRoute);
app.get('/', (req, res) => res.json({ message: 'Server running' }));
app.listen(5000, () => console.log('server running'));