const mongoose = require('mongoose');

//connection to the database
const connectDB = async () => {
  try{
    mongoose.connect("mongodb+srv://akshay1502:akshayrs@cluster0.y8buk.mongodb.net/?retryWrites=true&w=majority", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    console.log("connection successful!");
  } catch(err) {
    console.log(err);
  }
}

module.exports = connectDB;