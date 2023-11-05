const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../vars/.env') })

const mongouri = process.env.MONGO_URI;

const connectToMongo = () => {
  //   console.log(mongoURI);
  mongoose.connect(mongouri, () => {
    console.log("Connected to Database");
  });
};
module.exports = connectToMongo;
