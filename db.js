const mongoose = require('mongoose');
require('dotenv').config();

// define the MongoDB connection URL
const mongoURL =process.env.MONGODB_URL;// Replace 'mydtaabase with your dataabase name


//2set up mongodb connection

exports.connect = () => {
    mongoose.connect(mongoURL,{
          useNewUrlParser:true,
          useUnifiedTopology:true
    })
    .then(() => {
        console.log('DB connection sucessful')
    })
    .catch((err) => {
        console.log('Connection failed')
        console.log(err);
    })
}

// //3get the default connecton 
// //mongoose maintains a default connection object representing the mongoDB connection.

// const db = mongoose.connection;

// //4 define event listeners for database connection

// db.on('connected', () =>{
//     console.log('Connected to MongoDB server');
// });

// db.on('error', (err) =>{
//     console.log('MongoDB connected error :' , err);
// });

// db.on('disconnected', () =>{
//     console.log('MongoDB disconnected');
// });

// //6.Export the database connection

// module.exports = db;
