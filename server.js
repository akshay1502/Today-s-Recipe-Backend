const express = require('express');
const app = express();
require('./mongo_conn');
const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

app.use(express.json());
app.use(recipesRoute);
app.use(authRoute);

app.listen(5000, () => console.log('server running'));