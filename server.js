const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('./mongo_conn');

const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

app.use(express.json());
app.use(cookieParser());
app.use(recipesRoute);
app.use(authRoute);

app.listen(5000, () => console.log('server running'));