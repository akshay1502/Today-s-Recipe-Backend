const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("test");
});
app.get("/recipes", (req, res) => {
  res.json("get recipes");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
