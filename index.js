const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//  making connection to the database
const connectDB = require('./mongo_conn');
connectDB();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

//  api configuration
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors({
  credentials: true,
  origin: ["https://www.todaysrecipe.me", "http://localhost:3000"]
}));
app.use(cookieParser());

//  api routes
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes);
app.use(authRoutes);

//  default route
app.get('/', (req, res) => res.json({ message: 'Server running' }));
//  Listerning to server
app.listen(process.env.PORT || 5000, () => console.log('server running'));