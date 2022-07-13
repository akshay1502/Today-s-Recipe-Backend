const mongoose = require('mongoose');

//connection to the database
const connectDB = async () => {
  try{
    mongoose.connect("mongodb://localhost:27017/todaysRecipe", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    console.log("connection successful!");
  } catch(err) {
    console.log(err);
  }
}

module.exports = connectDB;