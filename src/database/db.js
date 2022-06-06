const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MongoUri

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('Connected to Database');
    })
}

module.exports = connectToMongo;