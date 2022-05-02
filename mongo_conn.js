const mongoose = require('mongoose');

//connection to the database
mongoose.connect("mongodb://localhost:27017/todaysRecipe", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connection successful!"))
.catch((err) => console.log(err));
