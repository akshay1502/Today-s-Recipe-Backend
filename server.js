const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./mongo_conn');
connectDB();

const authRoute = require('./routes/auth');
console.log(process.env.DBURL);
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors({
  credentials: true,
  origin: ["https://todaysrecipe.herokuapp.com", "http://localhost:3000"]
}));
app.use(cookieParser());
app.use("/recipes", require('./routes/recipes'));
app.use("/users", require('./routes/users'));
app.use(authRoute);
app.get('/', (req, res) => res.json({ message: 'Server running' }));
app.listen(process.env.PORT || 5000, () => console.log('server running'));