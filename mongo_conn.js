const mongoose = require('mongoose');

//connection to the database
const connectDB = async () => {
  try{
    mongoose.connect(process.env.DBURL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }).then(() => console.log("connection successful!"));
  } catch(err) {
    console.log(err);
  }
}

module.exports = connectDB;