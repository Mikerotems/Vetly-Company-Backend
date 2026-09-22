mongoose = require("mongoose");

const connectDB = async () =>{
    mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully");
}

module.exports = connectDB;