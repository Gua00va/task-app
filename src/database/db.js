const mongoose = require("mongoose");
require("dotenv").config("./env");
const mongouri =
  "mongodb+srv://hello123:hello123@cluster0.szsllyx.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  //   console.log(mongoURI);
  mongoose.connect(mongouri, () => {
    console.log("Connected to Database");
  });
};
module.exports = connectToMongo;
