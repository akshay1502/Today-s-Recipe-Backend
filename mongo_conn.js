const mongoose = require('mongoose');

//connection to the database
const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/todaysRecipe", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  console.log("connection successful!");
}

module.exports = connectDB;