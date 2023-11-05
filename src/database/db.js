const mongoose = require("mongoose");
require("dotenv").config("./env");
const mongouri = process.env.MONGO_URI;

const connectToMongo = () => {
  //   console.log(mongoURI);
  mongoose.connect(mongouri, () => {
    console.log("Connected to Database");
  });
};
module.exports = connectToMongo;
